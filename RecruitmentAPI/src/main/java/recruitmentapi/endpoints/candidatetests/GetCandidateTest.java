package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

public class GetCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        String id = request.getPathParameters().get("id");
        CandidateTest test = mapper.load(CandidateTest.class, id);
        if (test == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Candidate test does not exist"));
        }

        return new GatewayResponse<>(test, 200);
    }

}
