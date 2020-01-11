package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;
import recruitmentapi.services.TestService;

public class AddTest implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private TestService testService = new TestService();

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);
        if (test.getId() != null) {
            return new GatewayResponse<>(null, 400);
        }

        return new GatewayResponse<>(testService.create(test), 200);
    }
}