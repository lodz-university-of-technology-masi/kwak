package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.services.CandidateTestService;

public class GetCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private CandidateTestService candidateTestService = new CandidateTestService();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        return new GatewayResponse<>(candidateTestService.findById(request.getPathParameters().get("id")), 200);
    }

}
