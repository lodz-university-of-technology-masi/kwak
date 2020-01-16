package recruitmentapi.services.impl;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import recruitmentapi.services.CandidateTestService;
import recruitmentapi.services.TestService;
import recruitmentapi.util.KwakException;
import recruitmentapi.endpoints.tests.model.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TestServiceImpl implements TestService {
    public DynamoDBMapper mapper;
    public CandidateTestService candidateTestService;

    @Override
    public List<Test> findAll(String recruiterId) {
        Test test = new Test();
        test.setRecruiterId(recruiterId);
        return mapper.query(
                Test.class,
                new DynamoDBQueryExpression<Test>().withHashKeyValues(test)
        );
    }

    @Override
    public Test findById(String recruiterId, String testId) {
        return mapper.load(Test.class, recruiterId, testId);
    }

    @Override
    public List<Test> findByParent(String parentId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val1", new AttributeValue().withS(parentId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("ParentId = :val1")
                .withExpressionAttributeValues(eav);

        return mapper.scan(Test.class, scanExpression);
    }

    @Override
    public Test create(String recruiterId, Test test) {
        test.setRecruiterId(recruiterId);
        mapper.save(test);
        return test;
    }

    @Override
    public void delete(String recruiterId, String testId) {
        Test test = findById(recruiterId, testId);
        if (test == null) {
            throw new KwakException("Test [" + recruiterId + ", " + testId + "] does not exist");
        }

        mapper.delete(test);
    }

    @Override
    public void update(Test test) {
        if (findById(test.getRecruiterId(), test.getId()) == null) {
            throw new KwakException("Test [" + test.getId() + "] does not exist while updating");
        }

        mapper.save(test);
    }
}
