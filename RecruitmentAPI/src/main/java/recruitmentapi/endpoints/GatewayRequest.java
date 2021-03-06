package recruitmentapi.endpoints;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import recruitmentapi.services.KwakException;

import java.io.IOException;

public class GatewayRequest extends APIGatewayProxyRequestEvent {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    public <T> T getTypedBody(Class<T> type) {
        try {
            return objectMapper.readValue(getBody(), type);
        } catch (IOException exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    public String getUserSub() {
        if (System.getenv("AWS_SAM_LOCAL") != null) {
            return "f59ec9fa-13ae-4008-a8a3-6dcea7d22472";
        }

        String authProvider = getRequestContext().getIdentity().getCognitoAuthenticationProvider();
        return authProvider.split(":")[2];
    }
}
