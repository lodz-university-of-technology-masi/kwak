package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.services.KwakException;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;
import recruitmentapi.services.TranslatorService;

public class AddTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);
        if (test.getId() != null) {
            return new GatewayResponse<>(new ErrorMessage(400, "Test should not have an id"));
        }

        try {
            testService.create(request.getUserSub(), test);
            translate(test, request.getUserSub());
            return new GatewayResponse<>(test, 200);
        } catch (KwakException e) {
            return new GatewayResponse<>(new ErrorMessage(400, e.getMessage()));
        }
    }

    private void translate(Test test, String userSub) {
        if (test.getTargetLanguages() != null) {
            for (String lang : test.getTargetLanguages()) {
                Test translatedTest = TranslatorService.translateTest(test, lang);
                if (translatedTest != null) {
                    translatedTest.setParentId(test.getId());
                    testService.create(userSub, translatedTest);
                }
            }
        }
    }
}