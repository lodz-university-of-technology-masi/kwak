package recruitmentapi.endpoints.candidates.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;

import java.util.List;

public class GetAllCandidateTests implements RequestHandler<GatewayRequest, GatewayResponse<List<CandidateTest>>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<List<CandidateTest>> handleRequest(GatewayRequest request, Context context) {
        List<CandidateTest> candidateTests = mapper.scan(CandidateTest.class, new DynamoDBScanExpression());
        return new GatewayResponse<>(candidateTests, 200);
    }
}
