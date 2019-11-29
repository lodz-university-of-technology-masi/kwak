package recruitmentapi.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;

import java.util.ArrayList;

@DynamoDBTable(tableName = "CandidateTests")
public class CandidateTest {
    private String candidateId;
    private String testId;
    private ArrayList<CandidateAnswer> questions;

    @DynamoDBHashKey(attributeName = "CandidateId")
    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String id) {
        this.candidateId = id;
    }

    @DynamoDBRangeKey
    @DynamoDBAttribute(attributeName = "TestId")
    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    @DynamoDBAttribute(attributeName = "Answers")
    public ArrayList<CandidateAnswer> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<CandidateAnswer> questions) {
        this.questions = questions;
    }

}
