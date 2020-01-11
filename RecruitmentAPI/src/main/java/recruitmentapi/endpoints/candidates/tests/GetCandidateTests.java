package recruitmentapi.endpoints.candidates.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.services.CandidateTestService;

import java.util.List;

public class GetCandidateTests implements RequestHandler<GatewayRequest, GatewayResponse<List<CandidateTest>>> {
    private CandidateTestService candidateTestService = new CandidateTestService();

    @Override
    public GatewayResponse<List<CandidateTest>> handleRequest(GatewayRequest request, Context context) {
        String candidateId = request.getPathParameters().get("candidateId");
        if (candidateId == null) {
            return new GatewayResponse<>(null, 400);
        }

        return new GatewayResponse<>(candidateTestService.findByCandidate(candidateId), 200);
    }
}
