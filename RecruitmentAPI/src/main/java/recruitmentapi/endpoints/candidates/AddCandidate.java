package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.CognitoService;

public class AddCandidate implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    private CognitoService cognitoService = CognitoService.getInstance();

    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        Candidate candidate = request.getTypedBody(Candidate.class);
        return new GatewayResponse<>(cognitoService.createCandidate(candidate), 200);
    }
}
