package recruitmentapi.endpoints.candidatetests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import recruitmentapi.endpoints.ErrorMessage;
import recruitmentapi.endpoints.GatewayRequest;
import recruitmentapi.endpoints.GatewayResponse;
import recruitmentapi.services.KwakException;
import recruitmentapi.model.Answer;
import recruitmentapi.model.CandidateTest;
import recruitmentapi.model.Question;
import recruitmentapi.services.ServiceContainer;

import java.util.ArrayList;
import java.util.List;

public class SolveCandidateTest extends ServiceContainer implements RequestHandler<GatewayRequest, GatewayResponse<CandidateTest>> {
    @Override
    public GatewayResponse<CandidateTest> handleRequest(GatewayRequest request, Context context) {
        CandidateTest updatedTest = request.getTypedBody(CandidateTest.class);
        CandidateTest originalTest = candidateTestService.findByCandidateId(request.getUserSub(), request.getPathParameters().get("id"));
        if (originalTest == null) {
            return new GatewayResponse<>(404);
        }
        if (originalTest.getSolved() != null && originalTest.getSolved()) {
            return new GatewayResponse<>(new ErrorMessage(400, "Test already solved"));
        }
        originalTest.setSolved(true);
        applyDifferences(originalTest, updatedTest);

        try {
            candidateTestService.update(originalTest);
            return new GatewayResponse<>(204);
        } catch (KwakException e) {
            return new GatewayResponse<>(new ErrorMessage(400, e.getMessage()));
        }
    }

    private void applyDifferences(CandidateTest originalTest, CandidateTest updatedTest) {
        for (int questionId = 0; questionId < originalTest.getQuestions().size(); questionId++) {
            Question question = originalTest.getQuestions().get(questionId);
            Question updatedQuestion = updatedTest.getQuestions().get(questionId);

            if (question.getType().equals(Question.CLOSED)) {
                for (int answerId = 0; answerId < question.getAnswers().size(); answerId++) {
                    question.getAnswers().get(answerId).setSelected(updatedQuestion.getAnswers().get(answerId).getSelected());
                }
            } else {
                List<Answer> answers = new ArrayList<>();
                answers.add(updatedQuestion.getAnswers().get(0));
                question.setAnswers(answers);
            }
        }
    }
}
