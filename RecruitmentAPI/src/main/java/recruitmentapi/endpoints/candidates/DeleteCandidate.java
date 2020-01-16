package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.util.GatewayRequest;
import recruitmentapi.util.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.ServiceContainer;

public class DeleteCandidate extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        cognitoService.deleteCandidate(request.getPathParameters().get("candidateId"));
        return new GatewayResponse<>(204);
    }
}
