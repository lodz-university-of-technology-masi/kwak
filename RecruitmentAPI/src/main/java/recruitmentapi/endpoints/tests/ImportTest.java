package recruitmentapi.endpoints.tests;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.model.S3Object;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.MappingStrategy;
import com.opencsv.exceptions.*;
import recruitmentapi.util.ErrorMessage;
import recruitmentapi.util.GatewayRequest;
import recruitmentapi.util.GatewayResponse;
import recruitmentapi.util.KwakException;
import recruitmentapi.model.Answer;
import recruitmentapi.model.Question;
import recruitmentapi.model.Test;
import recruitmentapi.services.ServiceContainer;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ImportTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private String testLanguage = null;

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        ImportTestRequest importTestRequest = request.getTypedBody(ImportTestRequest.class);
        Test test = new Test();
        test.setTitle(importTestRequest.getTestTitle());
        try (S3Object object = s3Service.openFile(importTestRequest.getFileKey())) {
            test.setQuestions(new ArrayList<>(loadQuestions(object.getObjectContent())));
            test.setLang(testLanguage);
            testService.create(request.getUserSub(), test);
        } catch (KwakException e) {
            return new GatewayResponse<>(new ErrorMessage(400, e.toString()));
        } catch (IOException e) {
            return new GatewayResponse<>(400);
        }

        return new GatewayResponse<>(test, 200);
    }

    public List<Question> loadQuestions(InputStream inputStream) {
        try {
            CsvToBean<Question> csvToBean = new CsvToBeanBuilder<Question>(new InputStreamReader(inputStream))
                    .withSeparator(';')
                    .withMappingStrategy(
                            new QuestionMappingStrategy()
                    ).build();
            return csvToBean.parse().stream().filter(q -> q.getTitle() != null).collect(Collectors.toList());
        } catch (RuntimeException e){
            throw new KwakException(e);
        }
    }


    private static class ImportTestRequest {
        private String testTitle;
        private String fileKey;

        String getTestTitle() {
            return testTitle;
        }

        String getFileKey() {
            return fileKey;
        }

        public void setTestTitle(String testTitle) {
            this.testTitle = testTitle;
        }

        public void setFileKey(String fileKey) {
            this.fileKey = fileKey;
        }
    }

    private class QuestionMappingStrategy implements MappingStrategy<Question> {
        private String[] preprocess(String[] line) throws CsvValidationException {
            if (line.length < 2) {
                throw new CsvValidationException("Should have question data in first column and empty second");
            }

            if (line[0].isEmpty()) {
                return null;
            } else if (line[1].isEmpty()) {
                line = line[0].split(";");
            }

            return line;
        }

        @Override
        public Question populateNewBean(String[] line) throws CsvBeanIntrospectionException, CsvDataTypeMismatchException, CsvConstraintViolationException, CsvValidationException {
            line = preprocess(line);
            if (line == null) {
                return new Question();
            }
            if (line.length < 5) {
                throw new CsvValidationException("Line does not have enough fields got " + line.length + " fields.");
            }
            testLanguage = parseLanguage(line[2]);

            Question question = new Question();
            question.setType(parseQuestionCount(line[1]));
            question.setTitle(line[3]);
            if (question.getTitle().isEmpty()) {
                throw new CsvValidationException("Question title cannot be empty");
            }

            if (question.getType().equals(Question.CLOSED)) {
                question.setAnswers(parseAnswers(line));
            } else if (!line[4].equals("|")) {
                throw new CsvValidationException("Missing delimeter '|'");
            }

            return question;
        }

        private String parseLanguage(String lang) throws CsvDataTypeMismatchException {
            lang = lang.toLowerCase();
            if (!Test.isSupportedLanguage(lang)) {
                throw new CsvDataTypeMismatchException("Invalid language [" + lang + "]");
            }

            return lang;
        }

        private List<Answer> parseAnswers(String[] line) throws CsvDataTypeMismatchException, CsvConstraintViolationException {
            int answersCount = parseAnswerCount(line[4]);
            if (line.length < 5 + answersCount) {
                throw new CsvConstraintViolationException("Answer count != number of answers");
            }

            ArrayList<Answer> answers = new ArrayList<>();
            for (int i = 5; i < 5 + answersCount; i++) {
                if (line[i].isEmpty()) {
                    throw new CsvConstraintViolationException("Answer " + i + " cannot be empty");
                }
                answers.add(new Answer(line[i]));
            }

            return answers;
        }

        private int parseAnswerCount(String number) throws CsvDataTypeMismatchException, CsvConstraintViolationException {
            try {
                int num = Integer.parseInt(number);
                if (num <= 0) {
                    throw new CsvConstraintViolationException("Invalid answer count " + number + ", must be at least 1");
                }
                return num;
            } catch (NumberFormatException nfe) {
                throw new CsvDataTypeMismatchException("Invalid answer count " + number + ", must be an integer greater than 1");
            }
        }

        private String parseQuestionCount(String type) throws CsvDataTypeMismatchException {
            if (!type.equals(Question.CLOSED) && !type.equals(Question.OPEN) && !type.equals(Question.NUMBER)) {
                throw new CsvDataTypeMismatchException("Type " + type + " does not exist");
            }

            return type;
        }

        @Override
        public String[] transmuteBean(Question bean) {
            return new String[0];
        }

        @Override
        public void setType(Class<? extends Question> type) throws CsvBadConverterException {

        }

        @Override
        public void captureHeader(CSVReader reader){

        }

        @Override
        public String[] generateHeader(Question bean) {
            return new String[0];
        }
    }
}