package recruitmentapi.services;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import recruitmentapi.KwakException;
import recruitmentapi.model.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestService {
    DynamoDBMapper mapper;
    CandidateTestService candidateTestService;

    public List<Test> findAll(String recruiterId) {
        Test test = new Test();
        test.setRecruiterId(recruiterId);
        return mapper.query(
                Test.class,
                new DynamoDBQueryExpression<Test>().withHashKeyValues(test)
        );
    }

    public Test findById(String recruiterId, String testId) {
        return mapper.load(Test.class, recruiterId, testId);
    }

    public List<Test> findByParent(String parentId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val1", new AttributeValue().withS(parentId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("ParentId = :val1")
                .withExpressionAttributeValues(eav);

        return mapper.scan(Test.class, scanExpression);
    }

    public Test create(String recruiterId, Test test) {
        test.setRecruiterId(recruiterId);
        mapper.save(test);
        return test;
    }

    public void delete(String recruiterId, String testId) {
        Test test = findById(recruiterId, testId);
        if (test == null) {
            throw new KwakException("Test [" + recruiterId + ", " + testId + "] does not exist");
        }

        mapper.delete(test);
    }

    public void update(Test test) {
        if (findById(test.getRecruiterId(), test.getId()) == null) {
            throw new KwakException("Test [" + test.getId() + "] does not exist while updating");
        }

        mapper.save(test);
    }
}
