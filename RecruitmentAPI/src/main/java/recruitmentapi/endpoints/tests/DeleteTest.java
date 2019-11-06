package recruitmentapi.endpoints.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;

public class DeleteTest implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        String id = request.getPathParameters().get("id");
        if (id == null) {
            return new GatewayResponse<>(
                    new ErrorMessage(400, "Id is required")
            );
        }

        Test test = mapper.load(Test.class, id);
        if (test == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Test does not exist"));
        }

        mapper.delete(test);
        return new GatewayResponse<>(204);
    }

}
