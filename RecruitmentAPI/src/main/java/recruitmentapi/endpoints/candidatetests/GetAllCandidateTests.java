package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.services.CandidateTestService;

import java.util.List;

public class GetAllCandidateTests implements RequestHandler<GatewayRequest, GatewayResponse<List<CandidateTest>>> {
    private CandidateTestService candidateTestService = new CandidateTestService();

    @Override
    public GatewayResponse<List<CandidateTest>> handleRequest(GatewayRequest request, Context context) {
        return new GatewayResponse<>(candidateTestService.findAll(), 200);
    }
}
