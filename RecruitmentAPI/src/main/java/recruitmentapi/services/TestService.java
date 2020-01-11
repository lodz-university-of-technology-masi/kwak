package recruitmentapi.services;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.KwakException;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

import java.util.List;

public class TestService {
    private DynamoDBMapper mapper = DynamoDBAdapter.getMapper();
    private CandidateTestService candidateTestService = new CandidateTestService();

    public List<Test> findAll() {
        return mapper.scan(Test.class, new DynamoDBScanExpression());
    }

    public Test findById(String testId) {
        return mapper.load(Test.class, testId);
    }

    public Test create(Test test) {
        mapper.save(test);
        return test;
    }

    public void delete(String id) {
        Test test = findById(id);
        if (test == null) {
            throw new KwakException("Test does not exist");
        }

        mapper.batchDelete(candidateTestService.findByTestId(id));
        mapper.delete(test);
    }

    public void update(Test test) {
        if (findById(test.getId()) == null) {
            throw new KwakException("Test does not exist while updating");
        }

        mapper.save(test);
    }
}
