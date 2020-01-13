package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.GatewayRequest;
import recruitmentapi.GatewayResponse;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;
import recruitmentapi.services.TranslatorService;

public class UpdateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);

        if (test.getTargetLanguages() != null) {
            Test beforeTest = testService.findById(test.getId());

            for (Test translatedTest : testService.findByParent(test.getId())) {
                if (beforeTest.getTargetLanguages() != null && !beforeTest.getTargetLanguages().contains(translatedTest.getLang())) {
                    testService.delete(translatedTest.getId());
                } else {
                    translatedTest = TranslatorService.translateTest(test, translatedTest.getLang());
                    if (translatedTest != null) {
                        testService.update(translatedTest);
                    }
                }
            }

            for (String lang : test.getTargetLanguages()) {
                if (beforeTest.getTargetLanguages() != null && !beforeTest.getTargetLanguages().contains(lang)) {
                    Test translatedTest = TranslatorService.translateTest(test, lang);
                    if (translatedTest != null) {
                        testService.create(translatedTest);
                    }
                }
            }
        }

        testService.update(test);
        return new GatewayResponse<>(204);
    }

}
