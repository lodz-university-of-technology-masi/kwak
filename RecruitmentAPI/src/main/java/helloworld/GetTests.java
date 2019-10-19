package helloworld;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.List;

public class GetTests implements RequestHandler<Object, GatewayResponse<List<Test>>> {
    DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<List<Test>> handleRequest(Object input, Context context) {
        List<Test> tests = mapper.scan(Test.class, new DynamoDBScanExpression());
        return new GatewayResponse<>(tests, 200);
    }
}
