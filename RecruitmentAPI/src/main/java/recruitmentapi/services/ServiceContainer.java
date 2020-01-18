package recruitmentapi.services;

import recruitmentapi.services.impl.CandidateTestServiceImpl;
import recruitmentapi.services.impl.CognitoServiceImpl;
import recruitmentapi.services.impl.TestServiceImpl;

public class ServiceContainer {
    protected TestService testService;
    protected CandidateTestService candidateTestService;
    protected CognitoService cognitoService;

    public ServiceContainer() {
        cognitoService = new CognitoServiceImpl();

        TestServiceImpl testService = new TestServiceImpl();
        CandidateTestServiceImpl candidateTestService = new CandidateTestServiceImpl();
        candidateTestService.testService = testService;
        testService.candidateTestService = candidateTestService;

        DynamoDBAdapter adapter = new DynamoDBAdapter();
        testService.mapper = adapter.getMapper();
        candidateTestService.mapper = adapter.getMapper();

        this.testService = testService;
        this.candidateTestService = candidateTestService;
    }
}
