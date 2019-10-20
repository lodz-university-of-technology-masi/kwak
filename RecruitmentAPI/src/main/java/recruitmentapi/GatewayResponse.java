package recruitmentapi;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * POJO containing response object for API Gateway.
 */
public class GatewayResponse<Response> {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private String body;
    private final Map<String, String> headers;
    private int statusCode;

    public GatewayResponse(final Response body, final int statusCode) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        this.statusCode = statusCode;
        this.headers = Collections.unmodifiableMap(new HashMap<>(headers));

        try {
            this.body = objectMapper.writeValueAsString(body);
        } catch (JsonProcessingException e) {
            this.body = "Couldnt serialize Response object to JSON";
            this.statusCode = 500;
        }

    }

    public String getBody() {
        return body;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
