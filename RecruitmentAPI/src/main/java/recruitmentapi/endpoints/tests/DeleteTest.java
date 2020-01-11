package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;
import recruitmentapi.services.TestService;

import java.util.HashMap;
import java.util.List;

public class DeleteTest implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private TestService testService = new TestService();

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        testService.delete(request.getPathParameters().get("id"));
        return new GatewayResponse<>(204);
    }

}
