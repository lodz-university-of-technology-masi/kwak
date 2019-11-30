package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.CognitoSettings;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class GetCandidate implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId(CognitoSettings.USER_POOL_ID));
        String candidateId = request.getPathParameters().get("candidateId");

        Candidate candidate = users.getUsers().stream()
                .filter(userType -> Objects.equals(Candidate.getSub(userType), candidateId))
                .findAny()
                .map(Candidate::fromUserType)
                .orElse(null);

        if (candidate == null) {
            return new GatewayResponse<>(new ErrorMessage(404, "User not found"));
        }

        return new GatewayResponse<>(candidate, 200);
    }
}
