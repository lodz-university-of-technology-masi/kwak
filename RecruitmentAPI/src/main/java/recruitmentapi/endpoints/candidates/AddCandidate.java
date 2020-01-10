package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserResult;
import com.amazonaws.services.cognitoidp.model.AdminEnableUserRequest;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.CognitoSettings;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;

public class AddCandidate implements RequestHandler<GatewayRequest, GatewayResponse<Candidate>> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    @Override
    public GatewayResponse<Candidate> handleRequest(GatewayRequest request, Context context) {
        Candidate candidate = request.getTypedBody(Candidate.class);
        AdminCreateUserResult result = cognito.adminCreateUser(new AdminCreateUserRequest()
                .withUsername(candidate.getLogin())
                .withUserAttributes(
                    candidate.createAttributes()
                )
                .withUserPoolId(CognitoSettings.USER_POOL_ID)
        );

        candidate = Candidate.fromUserType(result.getUser());
        cognito.adminEnableUser(new AdminEnableUserRequest()
                .withUsername(candidate.getLogin())
                .withUserPoolId(CognitoSettings.USER_POOL_ID)
        );
        return new GatewayResponse<>(candidate, 200);
    }
}
