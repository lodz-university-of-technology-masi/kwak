package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;
import recruitmentapi.services.TestService;

import java.util.List;

public class GetTests implements RequestHandler<GatewayRequest, GatewayResponse<List<Test>>> {
    private TestService testService = new TestService();

    @Override
    public GatewayResponse<List<Test>> handleRequest(GatewayRequest request, Context context) {
        return new GatewayResponse<>(testService.findAll(), 200);
    }
}
