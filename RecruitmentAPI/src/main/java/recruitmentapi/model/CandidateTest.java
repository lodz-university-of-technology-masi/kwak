package recruitmentapi.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.ArrayList;

@DynamoDBTable(tableName = "CandidateTests")
public class CandidateTest {
    private String id;
    private String candidateId;
    private String testId;
    private String lang;
    private String title;
    private Boolean isSolved;
    private ArrayList<Question> questions;

    @DynamoDBHashKey(attributeName = "Id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName = "CandidateId")
    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String id) {
        this.candidateId = id;
    }

    @DynamoDBAttribute(attributeName = "TestId")
    public String getTestId() {
        return testId;
    }

    public void setTestId(String id) {
        this.testId = id;
    }

    @DynamoDBAttribute(attributeName = "Title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @DynamoDBAttribute(attributeName = "Language")
    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    @DynamoDBAttribute(attributeName = "Questions")
    public ArrayList<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<Question> questions) {
        this.questions = questions;
    }

    @DynamoDBAttribute(attributeName = "Solved")
    public Boolean getSolved() {
        return isSolved;
    }

    public void setSolved(Boolean solved) {
        isSolved = solved;
    }

}
