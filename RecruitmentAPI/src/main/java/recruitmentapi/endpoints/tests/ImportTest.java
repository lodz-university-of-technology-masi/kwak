package recruitmentapi.endpoints.tests;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.model.S3Object;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.MappingStrategy;
import com.opencsv.exceptions.*;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Answer;
import recruitmentapi.model.Question;
import recruitmentapi.model.Test;
import recruitmentapi.services.ServiceContainer;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class ImportTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private String testLanguage = null;

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        ImportTestRequest importTestRequest = request.getTypedBody(ImportTestRequest.class);
        S3Object testObject = s3Service.openFile(importTestRequest.getFileKey());

        Test test = new Test();
        test.setTitle(importTestRequest.getTestTitle());
        test.setQuestions(loadQuestions(testObject.getObjectContent()));
        test.setLang(testLanguage);

        try {
            testObject.close();
        } catch (IOException e) {
            return new GatewayResponse<>(400);
        }
        return new GatewayResponse<>(testService.create(test), 200);
    }

    private List<Question> loadQuestions(InputStream inputStream) {
        CsvToBean<Question> csvToBean = new CsvToBeanBuilder<Question>(new InputStreamReader(inputStream))
                .withSeparator(';')
                .withMappingStrategy(
                        new QuestionMappingStrategy()
                ).build();

        return csvToBean.parse();
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
        @Override
        public Question populateNewBean(String[] line) throws CsvBeanIntrospectionException, CsvDataTypeMismatchException, CsvConstraintViolationException, CsvValidationException {
            if (line.length < 5) {
                throw new CsvValidationException("Line does not have enough fields");
            }

            testLanguage = parseLanguage(line[2]);

            Question question = new Question();
            question.setType(parseQuestionCount(line[1]));
            question.setTitle(line[3]);
            if (question.getType().equals(Question.CLOSED)) {
                question.setAnswers(parseAnswers(line));
            }

            return question;
        }

        private String parseLanguage(String lang) throws CsvDataTypeMismatchException {
            if (!Test.isSupportedLanguage(lang)) {
                throw new CsvDataTypeMismatchException("Invalid Language");
            }

            return lang;
        }

        private List<Answer> parseAnswers(String[] line) throws CsvDataTypeMismatchException, CsvConstraintViolationException {
            int answersCount = parseAnswerCount(line[4]);
            if (line.length < 5 + answersCount) {
                throw new CsvConstraintViolationException("Not enough questions");
            }

            ArrayList<Answer> answers = new ArrayList<>();
            for (int i = 5; i < 5 + answersCount; i++) {
                answers.add(new Answer(line[i]));
            }

            return answers;
        }

        private int parseAnswerCount(String number) throws CsvDataTypeMismatchException {
            try {
                return Integer.parseInt(number);
            } catch (NumberFormatException nfe) {
                throw new CsvDataTypeMismatchException("Invalid question number");
            }
        }

        private String parseQuestionCount(String type) throws CsvDataTypeMismatchException {
            if (!type.equals(Question.CLOSED) && !type.equals(Question.OPEN) && !type.equals(Question.NUMBER)) {
                throw new CsvDataTypeMismatchException("Type does not exist");
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