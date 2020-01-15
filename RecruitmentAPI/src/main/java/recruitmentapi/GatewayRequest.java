package recruitmentapi;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.UUID;

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
        if (authProvider == null ){
            throw new KwakException("Tried to get userSub without authenticated user");
        }

        return authProvider.split(":")[2];
    }
}
