package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.services.CandidateTestService;

public class UpdateCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private CandidateTestService candidateTestService = new CandidateTestService();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest updatedTest = request.getTypedBody(CandidateTest.class);
        candidateTestService.update(updatedTest);
        return new GatewayResponse<>(204);
    }

}
