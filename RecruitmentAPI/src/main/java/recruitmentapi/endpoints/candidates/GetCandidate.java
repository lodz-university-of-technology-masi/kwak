package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.ServiceContainer;

public class GetCandidate extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
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
