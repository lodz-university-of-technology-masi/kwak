package recruitmentapi.services;

import recruitmentapi.DynamoDBAdapter;

public class ServiceContainer {
    protected TestService testService;
    protected CandidateTestService candidateTestService;
    protected CognitoService cognitoService;
    protected S3Service s3Service;

    public ServiceContainer() {
        s3Service = new S3Service();
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
