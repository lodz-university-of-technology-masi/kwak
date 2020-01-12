package recruitmentapi.endpoints;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.PresignedURL;
import recruitmentapi.model.Test;
import recruitmentapi.services.ServiceContainer;

public class GeneratePresignedURL extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<PresignedURL>> {

    @Override
    public GatewayResponse<PresignedURL> handleRequest(GatewayRequest input, Context context) {
        return new GatewayResponse<>(s3Service.generatePresignedURL(HttpMethod.PUT, "text/csv"), 200);
    }
}
