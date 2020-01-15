package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;
import recruitmentapi.services.TranslatorService;

public class AddTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);
        if (test.getId() != null) {
            return new GatewayResponse<>(null, 400);
        }

        testService.create(test);
        if (test.getTargetLanguages() != null) {
            for (String lang : test.getTargetLanguages()) {
                Test translatedTest = TranslatorService.translateTest(test, lang);
                if (translatedTest != null) {
                    translatedTest.setParentId(test.getId());
                    testService.create(translatedTest);
                }
            }
        }

        return new GatewayResponse<>(test, 200);
    }
}