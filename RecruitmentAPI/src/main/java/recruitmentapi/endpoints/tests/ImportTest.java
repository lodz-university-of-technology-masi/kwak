package recruitmentapi.endpoints.tests;


import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Test;
import recruitmentapi.services.ServiceContainer;

public class ImportTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        ImportTestRequest importTestRequest = request.getTypedBody(ImportTestRequest.class);

        return new GatewayResponse<>(200);
    }


    private static class ImportTestRequest {
        private String fileKey;
    }
}