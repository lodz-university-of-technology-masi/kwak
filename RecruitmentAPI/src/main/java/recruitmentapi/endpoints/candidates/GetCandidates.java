package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.CognitoService;
import recruitmentapi.services.ServiceContainer;

import java.util.List;
import java.util.stream.Collectors;

public class GetCandidates extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<List<Candidate>>> {

    @Override
    public GatewayResponse<List<Candidate>> handleRequest(GatewayRequest input, Context context) {
        return new GatewayResponse<>(cognitoService.findAllCandidates(), 200);
    }
}
