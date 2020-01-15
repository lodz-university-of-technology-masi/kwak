package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.CandidateTest;

import java.util.List;

public class GetAllCandidateTests extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<List<CandidateTest>>> {
    @Override
    public GatewayResponse<List<CandidateTest>> handleRequest(GatewayRequest request, Context context) {
        if (request.getQueryStringParameters() != null
        && "1".equals(request.getQueryStringParameters().get("candidate"))) {
            return new GatewayResponse<>(candidateTestService.findAllByCandidateId(request.getUserSub()), 200);
        }

        return new GatewayResponse<>(candidateTestService.findAllByRecruiterId(request.getUserSub()), 200);
    }
}
