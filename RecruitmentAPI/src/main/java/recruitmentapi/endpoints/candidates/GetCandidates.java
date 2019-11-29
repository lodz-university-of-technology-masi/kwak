package recruitmentapi.endpoints.candidates;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.CognitoSettings;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;

import java.util.List;
import java.util.stream.Collectors;

public class GetCandidates implements RequestHandler<GatewayRequest, GatewayResponse<List<Candidate>>> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();
    @Override
    public GatewayResponse<List<Candidate>> handleRequest(GatewayRequest input, Context context) {
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId(CognitoSettings.USER_POOL_ID));

        List<Candidate> candidates = users.getUsers().stream()
                .filter(this::isRegularUser)
                .map(Candidate::fromUserType)
                .collect(Collectors.toList());

        return new GatewayResponse<>(candidates, 200);
    }

    private boolean isRegularUser(UserType userType) {
        AdminListGroupsForUserResult result = cognito.adminListGroupsForUser(
                new AdminListGroupsForUserRequest()
                        .withUserPoolId(CognitoSettings.USER_POOL_ID)
                        .withUsername(userType.getUsername())
        );

        return result.getGroups().stream().noneMatch(groupType -> groupType.getGroupName().equals(CognitoSettings.ADMIN_GROUP_NAME));
    }
}
