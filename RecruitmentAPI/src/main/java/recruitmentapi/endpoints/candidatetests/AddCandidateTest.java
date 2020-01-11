package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.CandidateTest;

public class AddCandidateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest candidateTest = request.getTypedBody(CandidateTest.class);
        if (candidateTest.getId() != null || candidateTest.getTestId() == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Invalid candidateTest"));
        }

        return new GatewayResponse<>(candidateTestService.create(candidateTest), 200);
    }
}