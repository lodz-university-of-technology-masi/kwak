package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.ServiceContainer;

import java.util.List;

public class GetCandidates extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<List<Candidate>>> {

    @Override
    public GatewayResponse<List<Candidate>> handleRequest(GatewayRequest input, Context context) {
        return new GatewayResponse<>(cognitoService.findAllCandidates(), 200);
    }
}
