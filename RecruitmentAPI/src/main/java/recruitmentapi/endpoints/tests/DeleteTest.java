package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.services.KwakException;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;

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
