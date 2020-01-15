package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;

import java.util.List;

public class GetTests extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<List<Test>>> {
    @Override
    public GatewayResponse<List<Test>> handleRequest(GatewayRequest request, Context context) {
        return new GatewayResponse<>(testService.findAll(request.getUserSub()), 200);
    }
}
