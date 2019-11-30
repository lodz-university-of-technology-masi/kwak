package recruitmentapi.endpoints.candidates.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;

import java.util.List;

public class GetCandidateTests implements RequestHandler<GatewayRequest, GatewayResponse<List<CandidateTest>>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<List<CandidateTest>> handleRequest(GatewayRequest request, Context context) {
        String candidateId = request.getPathParameters().get("candidateId");
        if (candidateId == null) {
            return new GatewayResponse<>(null, 400);
        }

        CandidateTest candidateTest = new CandidateTest();
        candidateTest.setCandidateId(candidateId);
        List<CandidateTest> candidateTests = mapper.query(
                CandidateTest.class,
                new DynamoDBQueryExpression<CandidateTest>().withHashKeyValues(candidateTest)
        );

        return new GatewayResponse<>(candidateTests, 200);
    }
}
