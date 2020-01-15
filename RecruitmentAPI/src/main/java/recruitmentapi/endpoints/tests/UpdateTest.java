package recruitmentapi.endpoints.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.util.ErrorMessage;
import recruitmentapi.util.GatewayRequest;
import recruitmentapi.util.GatewayResponse;
import recruitmentapi.util.KwakException;
import recruitmentapi.services.ServiceContainer;
import recruitmentapi.model.Test;
import recruitmentapi.services.TranslatorService;

public class UpdateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<Test>> {
    @Override
    public GatewayResponse<Test> handleRequest(GatewayRequest request, Context context) {
        Test test = request.getTypedBody(Test.class);
        try {
            if (test.getTargetLanguages() != null) {
                Test beforeTest = testService.findById(request.getUserSub(), test.getId());
                updateExistingTests(beforeTest, test, request.getUserSub());
                createMissingTranslations(beforeTest, test, request.getUserSub());
            }
            testService.update(test);
            return new GatewayResponse<>(204);
        }  catch (KwakException e) {
            return new GatewayResponse<>(new ErrorMessage(400, e.getMessage()));
        }
    }

    private void updateExistingTests(Test beforeTest, Test test, String userSub) {
        for (Test translatedTest : testService.findByParent(test.getId())) {
            if (beforeTest.getTargetLanguages() != null && !beforeTest.getTargetLanguages().contains(translatedTest.getLang())) {
                testService.delete(userSub, translatedTest.getId());
            } else {
                String id = translatedTest.getId();
                String recruiterId = translatedTest.getRecruiterId();
                translatedTest = TranslatorService.translateTest(test, translatedTest.getLang());
                if (translatedTest != null) {
                    translatedTest.setId(id);
                    translatedTest.setRecruiterId(recruiterId);
                    testService.update(translatedTest);
                }
            }
        }
    }

    private void createMissingTranslations(Test beforeTest, Test test, String userSub) {
        for (String lang : test.getTargetLanguages()) {
            if (beforeTest.getTargetLanguages() != null && !beforeTest.getTargetLanguages().contains(lang)) {
                Test translatedTest = TranslatorService.translateTest(test, lang);
                if (translatedTest != null) {
                    testService.create(userSub, translatedTest);
                }
            }
        }
    }

}
