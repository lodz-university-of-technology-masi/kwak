package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;
import recruitmentapi.services.TestService;

public class GetTest implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    private TestService testService = new TestService();

    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = testService.findById(request.getPathParameters().get("id"));
        if (test == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Test does not exist"));
        }

        return new GatewayResponse<>(test, 200);
    }

}
