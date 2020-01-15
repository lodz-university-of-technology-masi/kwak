package recruitmentapi.services;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import recruitmentapi.KwakException;
import recruitmentapi.model.Candidate;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CandidateTestService {
    DynamoDBMapper mapper;
    TestService testService;

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

    public List<CandidateTest> findAllByRecruiterId(String recruiterId) {
        CandidateTest candidateTest = new CandidateTest();
        candidateTest.setRecruiterId(recruiterId);

        return mapper.query(
                CandidateTest.class,
                new DynamoDBQueryExpression<CandidateTest>()
                        .withHashKeyValues(candidateTest)
        );
    }

    public void delete(String recruiterId, String candidateTestId) {
        CandidateTest test = findByRecruiterId(recruiterId, candidateTestId);
        if (test == null) {
            throw new KwakException("CandidateTest does not exist");
        }

        mapper.delete(test);
    }

    public CandidateTest findByRecruiterId(String recruiterId, String candidateTestId) {
        return mapper.load(CandidateTest.class, recruiterId, candidateTestId);
    }

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

    public void update(CandidateTest candidateTest) {
        if (findByRecruiterId(candidateTest.getRecruiterId(), candidateTest.getId()) == null) {
            throw new KwakException("Test does not exist while updating");
        }

        mapper.save(candidateTest);
    }
}
