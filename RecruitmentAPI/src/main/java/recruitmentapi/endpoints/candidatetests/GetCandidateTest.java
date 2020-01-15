package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.CandidateTest;

public class GetCandidateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        if (request.getQueryStringParameters() != null
                && "1".equals(request.getQueryStringParameters().get("candidate"))) {
            return new GatewayResponse<>(
                    candidateTestService.findByCandidateId(
                            request.getUserSub(),
                            request.getPathParameters().get("id")
                    ),
                    200
            );
        }

        return new GatewayResponse<>(
                candidateTestService.findByRecruiterId(
                        request.getUserSub(),
                        request.getPathParameters().get("id")
                ),
                200
        );
    }

}
