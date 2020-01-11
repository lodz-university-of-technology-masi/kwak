package recruitmentapi.services;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.KwakException;
import recruitmentapi.model.CandidateTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CandidateTestService {
    private DynamoDBMapper mapper = DynamoDBAdapter.getMapper();
    private TestService testService = new TestService();

    public CandidateTest create(CandidateTest candidateTest) {
        if (testService.findById(candidateTest.getTestId()) == null ) {
            throw new KwakException("Test does not exist");
        }

        candidateTest.setQuestions(new ArrayList<>());
        mapper.save(candidateTest);
        return candidateTest;
    }

    public List<CandidateTest> findByCandidate(String candidateId) {
        HashMap<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS(candidateId));
        return mapper.scan(
                CandidateTest.class,
                new DynamoDBScanExpression()
                        .withFilterExpression("CandidateId = :v1")
                        .withExpressionAttributeValues(eav)
        );
    }

    List<CandidateTest> findByTestId(String id) {
        HashMap<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS(id));
        return mapper.scan(
                CandidateTest.class,
                new DynamoDBScanExpression()
                        .withFilterExpression("TestId = :v1")
                        .withExpressionAttributeValues(eav)
        );
    }

    public void delete(String id) {
        CandidateTest test = mapper.load(CandidateTest.class, id);
        if (test == null) {
            throw new KwakException("Test does not exist");
        }

        mapper.delete(test);
    }

    public List<CandidateTest> findAll() {
        return mapper.scan(CandidateTest.class, new DynamoDBScanExpression());
    }

    public CandidateTest findById(String id) {
        return mapper.load(CandidateTest.class, id);
    }

    public void update(CandidateTest candidateTest) {
        if (findById(candidateTest.getId()) == null) {
            throw new KwakException("Test does not exist while updating");
        }

        mapper.save(candidateTest);
    }
}
