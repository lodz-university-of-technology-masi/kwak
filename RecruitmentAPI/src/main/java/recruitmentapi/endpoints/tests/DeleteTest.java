package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.tests.model.Test;
import recruitmentapi.util.ErrorMessage;
import recruitmentapi.util.GatewayRequest;
import recruitmentapi.util.GatewayResponse;
import recruitmentapi.util.KwakException;
import recruitmentapi.services.ServiceContainer;

public class DeleteTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        try  {
            testService.delete(request.getUserSub(), request.getPathParameters().get("id"));
            return new GatewayResponse<>(204);
        } catch (KwakException e) {
            return new GatewayResponse<>(new ErrorMessage(400, e.getMessage()));
        }
    }

}
