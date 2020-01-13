package recruitmentapi.services;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
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

    public List<Test> findAll() {
        return mapper.scan(Test.class, new DynamoDBScanExpression());
    }

    public Test findById(String testId) {
        return mapper.load(Test.class, testId);
    }

    public List<Test> findByParent(String parentId) {
        Map<String, AttributeValue> eav = new HashMap<>();
        eav.put(":val1", new AttributeValue().withS(parentId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("ParentId = :val1")
                .withExpressionAttributeValues(eav);

        return mapper.scan(Test.class, scanExpression);
    }

    public Test create(Test test) {
        mapper.save(test);
        return test;
    }

    public void delete(String id) {
        Test test = findById(id);
        if (test == null) {
            throw new KwakException("Test [" + id + "] does not exist");
        }

        mapper.delete(test);
    }

    public void update(Test test) {
        if (findById(test.getId()) == null) {
            throw new KwakException("Test [" + test.getId() + "] does not exist while updating");
        }

        mapper.save(test);
    }
}
