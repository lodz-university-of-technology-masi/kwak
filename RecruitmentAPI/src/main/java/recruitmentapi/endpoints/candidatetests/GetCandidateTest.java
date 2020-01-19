package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.services.KwakException;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.CandidateTest;

public class GetCandidateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest test;
        if (request.getQueryStringParameters() != null
                && "1".equals(request.getQueryStringParameters().get("candidate"))) {
            test = candidateTestService.findByCandidateId(request.getUserSub(), request.getPathParameters().get("id"));
        } else {
            test = candidateTestService.findByRecruiterId(request.getUserSub(), request.getPathParameters().get("id"));
        }

        if (test == null) {
            return new GatewayResponse<>(new ErrorMessage(404, "CandidateTest not found"));
        }

        return new GatewayResponse<>(test, 200);
    }

}
