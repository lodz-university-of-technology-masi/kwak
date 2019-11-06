package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;

public class AddTest implements RequestHandler<Test, GatewayResponse<Test>> {
    DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<Test> handleRequest(Test test, Context context) {
        mapper.save(test);
        return new GatewayResponse<>(test, 200);
    }
}