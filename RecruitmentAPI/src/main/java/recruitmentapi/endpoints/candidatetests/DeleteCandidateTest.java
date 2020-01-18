package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.services.KwakException;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.CandidateTest;

public class DeleteCandidateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        try {
            candidateTestService.delete(request.getUserSub(), request.getPathParameters().get("id"));
            return new GatewayResponse<>(204);
        } catch (KwakException e) {
            return new GatewayResponse<>(new ErrorMessage(400, e.getMessage()));
        }
    }

}
