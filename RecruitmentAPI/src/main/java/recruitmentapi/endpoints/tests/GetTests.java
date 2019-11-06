package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;

import java.util.List;

public class GetTests implements RequestHandler<GatewayRequest, GatewayResponse<List<Test>>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<List<Test>> handleRequest(GatewayRequest request, Context context) {
        List<Test> tests = mapper.scan(Test.class, new DynamoDBScanExpression());
        return new GatewayResponse<>(tests, 200);
    }
}
