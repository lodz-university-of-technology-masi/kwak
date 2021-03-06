package recruitmentapi.endpoints;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.services.S3Service;
import recruitmentapi.services.ServiceContainer;

public class GeneratePresignedURL extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<S3Service.PresignedURL>> {

    @Override
    public GatewayResponse<S3Service.PresignedURL> handleRequest(GatewayRequest input, Context context) {
        return new GatewayResponse<>(s3Service.generatePresignedURL(HttpMethod.PUT, "text/csv"), 200);
    }
}
