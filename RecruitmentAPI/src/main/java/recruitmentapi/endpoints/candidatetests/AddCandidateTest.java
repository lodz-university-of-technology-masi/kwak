package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

import java.util.ArrayList;

public class AddCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest test = request.getTypedBody(CandidateTest.class);
        if (test.getId() != null) {
            return new GatewayResponse<>(null, 400);
        }

        if (test.getQuestions() == null) {
            test.setQuestions(new ArrayList<>());
        }
        mapper.save(test);
        return new GatewayResponse<>(test, 200);
    }
}