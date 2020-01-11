package recruitmentapi.services;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import recruitmentapi.model.Candidate;

import java.util.List;
import java.util.stream.Collectors;

public class CognitoService {
    private final String USER_POOL_ID = "eu-central-1_9wfYARgNE";
    private final String ADMIN_GROUP_NAME = "Admin";
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public Candidate findCandidateById(String candidateId) {
        AdminGetUserResult result = cognito.adminGetUser(new AdminGetUserRequest()
                .withUserPoolId(USER_POOL_ID)
                .withUsername(candidateId));

        return Candidate.fromAttributes(result.getUsername(), result.getUserAttributes());
    }

    public Candidate createCandidate(Candidate candidate) {
        AdminCreateUserResult result = cognito.adminCreateUser(new AdminCreateUserRequest()
                .withUserPoolId(USER_POOL_ID)
                .withUsername(candidate.getEmail())
                .withUserAttributes(
                        candidate.createAttributes()
                )
        );

        return Candidate.fromUserType(result.getUser());
    }

    public List<Candidate> findAllCandidates() {
        ListUsersResult users = cognito.listUsers(new ListUsersRequest().withUserPoolId(USER_POOL_ID));
        return users.getUsers().stream()
                .filter(this::isRegularUser)
                .map(Candidate::fromUserType)
                .collect(Collectors.toList());
    }

    private boolean isRegularUser(UserType userType) {
        AdminListGroupsForUserResult result = cognito.adminListGroupsForUser(
                new AdminListGroupsForUserRequest()
                        .withUserPoolId(USER_POOL_ID)
                        .withUsername(userType.getUsername())
        );

        return result.getGroups().stream().noneMatch(groupType -> groupType.getGroupName().equals(ADMIN_GROUP_NAME));
    }
}
