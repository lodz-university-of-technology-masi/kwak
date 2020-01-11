package recruitmentapi.endpoints.candidates.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.CandidateTest;

import java.util.List;

public class GetCandidateTests extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<List<CandidateTest>>> {
    @Override
    public GatewayResponse<List<CandidateTest>> handleRequest(GatewayRequest request, Context context) {
        String candidateId = request.getPathParameters().get("candidateId");
        if (candidateId == null) {
            return new GatewayResponse<>(null, 400);
        }

        return new GatewayResponse<>(candidateTestService.findByCandidate(candidateId), 200);
    }
}
