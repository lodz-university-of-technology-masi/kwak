package recruitmentapi.endpoints.candidates.tests;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.CognitoSettings;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

import java.util.ArrayList;
import java.util.List;

public class AddCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest candidateTest = request.getTypedBody(CandidateTest.class);
        String candidateId = request.getPathParameters().get("candidateId");
        if (candidateId == null || candidateTest.getTestId() == null) {
            return new GatewayResponse<>(null, 400);
        }

        Test test = new Test();
        test.setId(candidateTest.getTestId());
        List<Test> tests = mapper.query(Test.class, new DynamoDBQueryExpression<Test>().withHashKeyValues(test));
        if (tests.size() == 0) {
            return new GatewayResponse<>(null, 400);
        }

        ListUsersResult listUsersResult = cognito.listUsers(new ListUsersRequest()
                .withUserPoolId(CognitoSettings.USER_POOL_ID)
                .withFilter(String.format("sub = \"%s\"", candidateId))
        );
        if (listUsersResult.getUsers().size() == 0 ){
            return new GatewayResponse<>(null, 400);
        }

        candidateTest.setCandidateId(candidateId);
        candidateTest.setQuestions(new ArrayList<>());
        mapper.save(candidateTest);
        return new GatewayResponse<>(candidateTest, 200);
    }
}
