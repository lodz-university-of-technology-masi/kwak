package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;

public class GetTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = testService.findById(request.getUserSub(), request.getPathParameters().get("id"));
        if (test == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Test does not exist"));
        }

        return new GatewayResponse<>(test, 200);
    }

}
