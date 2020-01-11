package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;
import recruitmentapi.services.TestService;

public class UpdateTest implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private TestService testService = new TestService();

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);
        testService.update(test);
        return new GatewayResponse<>(204);
    }

}
