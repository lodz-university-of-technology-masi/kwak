package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.CognitoService;

public class GetCandidate implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    private CognitoService cognitoService = CognitoService.getInstance();

    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        String candidateId = request.getPathParameters().get("candidateId");
        Candidate candidate = cognitoService.findCandidateById(candidateId);
        if (candidate == null) {
            return new GatewayResponse<>(new ErrorMessage(404, "User not found"));
        }

        return new GatewayResponse<>(candidate, 200);
    }
}
