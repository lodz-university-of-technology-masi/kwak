package recruitmentapi.services.impl;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import recruitmentapi.services.CandidateTestService;
import recruitmentapi.services.TestService;
import recruitmentapi.services.KwakException;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

import java.util.List;

public class CandidateTestServiceImpl implements CandidateTestService {
    public DynamoDBMapper mapper;
    public TestService testService;

    @Override
    public CandidateTest create(String recruiterId, CandidateTest candidateTest) {
        Test test = testService.findById(recruiterId, candidateTest.getTestId());
        if (test == null ) {
            throw new KwakException("Test does not exist");
        }
        candidateTest.setRecruiterId(recruiterId);
        candidateTest.setQuestions(test.getQuestions());
        candidateTest.setLang(test.getLang());
        candidateTest.setTitle(test.getTitle());
        mapper.save(candidateTest);
        return candidateTest;
    }

    @Override
    public List<CandidateTest> findAllByCandidateId(String candidateId) {
        CandidateTest candidateTest = new CandidateTest();
        candidateTest.setCandidateId(candidateId);

        return mapper.query(
                CandidateTest.class,
                new DynamoDBQueryExpression<CandidateTest>()
                        .withIndexName("CandidateIdIndex")
                        .withConsistentRead(false)
                        .withHashKeyValues(candidateTest)
        );
    }

    @Override
    public List<CandidateTest> findAllByRecruiterId(String recruiterId) {
        CandidateTest candidateTest = new CandidateTest();
        candidateTest.setRecruiterId(recruiterId);

        return mapper.query(
                CandidateTest.class,
                new DynamoDBQueryExpression<CandidateTest>()
                        .withHashKeyValues(candidateTest)
        );
    }

    @Override
    public void delete(String recruiterId, String candidateTestId) {
        CandidateTest test = findByRecruiterId(recruiterId, candidateTestId);
        if (test == null) {
            throw new KwakException("CandidateTest does not exist");
        }

        mapper.delete(test);
    }

    @Override
    public void deleteByCandidateId(String candidateId) {
        List<CandidateTest> tests = findAllByCandidateId(candidateId);
        mapper.batchDelete(tests);
    }

    @Override
    public CandidateTest findByRecruiterId(String recruiterId, String candidateTestId) {
        return mapper.load(CandidateTest.class, recruiterId, candidateTestId);
    }

    @Override
    public CandidateTest findByCandidateId(String candidateId, String candidateTestId) {
        CandidateTest candidateTest = new CandidateTest();
        candidateTest.setCandidateId(candidateId);

        return mapper.query(
                CandidateTest.class,
                new DynamoDBQueryExpression<CandidateTest>()
                        .withIndexName("CandidateIdIndex")
                        .withConsistentRead(false)
                        .withHashKeyValues(candidateTest)
                        .withRangeKeyCondition(
                                "Id",
                                new Condition()
                                        .withComparisonOperator(ComparisonOperator.EQ)
                                        .withAttributeValueList(new AttributeValue().withS(candidateTestId))
                        )
                        .withLimit(1)
        ).get(0);
    }

    @Override
    public void update(CandidateTest candidateTest) {
        if (findByRecruiterId(candidateTest.getRecruiterId(), candidateTest.getId()) == null) {
            throw new KwakException("Test does not exist while updating");
        }

        mapper.save(candidateTest);
    }
}
