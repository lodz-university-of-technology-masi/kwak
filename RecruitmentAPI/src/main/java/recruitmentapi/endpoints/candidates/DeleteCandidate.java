package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.ServiceContainer;

public class DeleteCandidate extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        String candidateId = request.getPathParameters().get("candidateId");
        candidateTestService.deleteByCandidateId(candidateId);
        cognitoService.deleteCandidate(candidateId);
        return new GatewayResponse<>(204);
    }
}
