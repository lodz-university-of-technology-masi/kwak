package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.cognitoidp.model.UsernameExistsException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.ServiceContainer;

public class AddCandidate extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        Candidate candidate = request.getTypedBody(Candidate.class);
        try {
            return new GatewayResponse<>(cognitoService.createCandidate(candidate), 200);
        } catch (UsernameExistsException e) {
            return new GatewayResponse<>(new ErrorMessage(400, "Email is already in use by admin or candidate"));
        }
    }
}
