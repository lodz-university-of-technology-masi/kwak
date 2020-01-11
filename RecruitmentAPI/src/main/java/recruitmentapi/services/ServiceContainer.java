package recruitmentapi.services;

import recruitmentapi.DynamoDBAdapter;

public class ServiceContainer {
    protected TestService testService;
    protected CandidateTestService candidateTestService;
    protected CognitoService cognitoService;

    public ServiceContainer() {
        cognitoService = new CognitoService();
        testService = new TestService();
        candidateTestService = new CandidateTestService();
        candidateTestService.testService = testService;
        testService.candidateTestService = candidateTestService;

        DynamoDBAdapter adapter = new DynamoDBAdapter();
        testService.mapper = adapter.getMapper();
        candidateTestService.mapper = adapter.getMapper();
    }
}
