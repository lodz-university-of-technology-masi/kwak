package recruitmentapi;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class GatewayRequest extends APIGatewayProxyRequestEvent {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    public <T> T getTypedBody(Class<T> type) {
        try {
            return objectMapper.readValue(getBody(), type);
        } catch (IOException exception) {
            return null;
        }
    }
}
