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

import java.util.List;
import java.util.stream.Collectors;

public class GetCandidates implements RequestHandler<GatewayRequest, GatewayResponse<List<Candidate>>> {
    private CognitoService cognitoService = CognitoService.getInstance();

    @Override
    public GatewayResponse<List<Candidate>> handleRequest(GatewayRequest input, Context context) {
        return new GatewayResponse<>(cognitoService.findAllCandidates(), 200);
    }
}
