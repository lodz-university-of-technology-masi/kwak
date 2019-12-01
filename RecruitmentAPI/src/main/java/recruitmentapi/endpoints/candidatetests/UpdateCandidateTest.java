package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.DynamoDBAdapter;
import recruitmentapi.ErrorMessage;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.model.Candidate;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Test;

public class UpdateCandidateTest implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    private DynamoDBMapper mapper = new DynamoDBAdapter().getMapper();

    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest updatedTest = request.getTypedBody(CandidateTest.class);
        String id = request.getPathParameters().get("id");
        if (id == null || !id.equals(updatedTest.getId())) {
            return new GatewayResponse<>(
                    new ErrorMessage(400, "Id differs: " + id +" vs " + updatedTest.getId())
            );
        }

        CandidateTest test = mapper.load(CandidateTest.class, id);
        if (test == null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Test does not exist"));
        }

        mapper.save(updatedTest);
        return new GatewayResponse<>(204);
    }

}
