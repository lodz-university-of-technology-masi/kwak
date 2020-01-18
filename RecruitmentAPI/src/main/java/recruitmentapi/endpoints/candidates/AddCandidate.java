package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.ServiceContainer;

public class AddCandidate extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        Candidate candidate = request.getTypedBody(Candidate.class);
        return new GatewayResponse<>(cognitoService.createCandidate(candidate), 200);
    }
}
