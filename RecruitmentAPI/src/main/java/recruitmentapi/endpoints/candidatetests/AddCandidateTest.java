package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.services.CandidateTestService;

public class AddCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private CandidateTestService candidateTestService = new CandidateTestService();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest candidateTest = request.getTypedBody(CandidateTest.class);
        if (candidateTest.getId() != null || candidateTest.getTestId() == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Invalid candidateTest"));
        }

        return new GatewayResponse<>(candidateTestService.create(candidateTest), 200);
    }
}