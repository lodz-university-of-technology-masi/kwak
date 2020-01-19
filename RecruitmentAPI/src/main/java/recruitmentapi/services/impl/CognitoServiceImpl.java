package recruitmentapi.services.impl;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import recruitmentapi.model.Candidate;
import recruitmentapi.services.CognitoService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CognitoServiceImpl implements CognitoService {
    private final String USER_POOL_ID = "eu-central-1_9wfYARgNE";
    private final String ADMIN_GROUP_NAME = "Admin";
    private final String CANDIDATE_GROUP_NAME = "Candidate";
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    @Override
    public Candidate findCandidateById(String candidateId) {
        AdminGetUserResult result = cognito.adminGetUser(
                new AdminGetUserRequest()
                .withUserPoolId(USER_POOL_ID)
                .withUsername(candidateId)
        );

        return fromAttributes(result.getUsername(), result.getUserAttributes());
    }

    @Override
    public Candidate createCandidate(Candidate candidate) {
        AdminCreateUserResult result = cognito.adminCreateUser(new AdminCreateUserRequest()
                .withUserPoolId(USER_POOL_ID)
                .withUsername(candidate.getEmail())
                .withUserAttributes(
                        createAttributes(candidate)
                )
        );

        cognito.adminAddUserToGroup(
                new AdminAddUserToGroupRequest()
                .withUserPoolId(USER_POOL_ID)
                .withUsername(candidate.getEmail())
                .withGroupName(CANDIDATE_GROUP_NAME)
        );

        return fromUserType(result.getUser());
    }

    @Override
    public List<Candidate> findAllCandidates() {
        return cognito.listUsersInGroup(
                new ListUsersInGroupRequest()
                .withUserPoolId(USER_POOL_ID)
                .withGroupName(CANDIDATE_GROUP_NAME)
        ).getUsers().stream()
                .map(this::fromUserType)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCandidate(String id) {
        cognito.adminDeleteUser(new AdminDeleteUserRequest().withUserPoolId(USER_POOL_ID).withUsername(id));
    }

    private Candidate fromUserType(UserType userType) {
        return fromAttributes(userType.getUsername(), userType.getAttributes());
    }

    private Candidate fromAttributes(String id, Collection<AttributeType> attributes) {
        Candidate candidate = new Candidate();
        candidate.setId(id);
        for (AttributeType attribute : attributes) {
            if (attribute.getName().equals("email")) {
                candidate.setEmail(attribute.getValue());
            }
            if (attribute.getName().equals("given_name")) {
                candidate.setName(attribute.getValue());
            }
            if (attribute.getName().equals("family_name")) {
                candidate.setSurname(attribute.getValue());
            }
        }

        return candidate;
    }

    private List<AttributeType> createAttributes(Candidate candidate) {
        List<AttributeType> attributes = new ArrayList<>();
        attributes.add(new AttributeType().withName("email").withValue(candidate.getEmail()));
        attributes.add(new AttributeType().withName("given_name").withValue(candidate.getName()));
        attributes.add(new AttributeType().withName("family_name").withValue(candidate.getSurname()));
        return attributes;
    }
}
