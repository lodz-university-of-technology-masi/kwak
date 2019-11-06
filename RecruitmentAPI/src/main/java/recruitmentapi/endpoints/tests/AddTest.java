package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;

public class AddTest implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);
        if (test.getId() != null) {
            return new GatewayResponse<>(null, 400);
        }

        mapper.save(test);
        return new GatewayResponse<>(test, 200);
    }
}