package recruitmentapi.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.ArrayList;
import java.util.List;

@DynamoDBDocument
public class Question {

    private String title;
    private String description;
    private String code;
    private String type;
    private List<Answer> answers;
    private Boolean isCorrect;

    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public List<String> getTranslatableTexts() {
        List<String> texts = new ArrayList<>();

        if (title != null && !title.isEmpty()) {
            texts.add(title);
        }

        if (description != null && !description.isEmpty()) {
            texts.add(description);
        }

        for (Answer answer : answers) {
            texts.addAll(answer.getTranslatableTexts());
        }

        return texts;
    }

    static Question translate(Question base, List<String> texts) {
        Question question = new Question();
        question.type = base.type;
        question.code = base.code;

        if (base.title != null && !base.title.isEmpty()) {
            question.title = texts.remove(0);
        }

        ArrayList<Answer> answers = new ArrayList<>();
        for (Answer answer : base.answers) {
            answers.add(Answer.translate(answer, texts));
        }
        question.setAnswers(answers);

        return question;
    }

    public static final String OPEN = "O";
    public static final String NUMBER = "L";
    public static final String CLOSED = "W";
}
