package recruitmentapi.services;

import recruitmentapi.endpoints.candidatetests.model.CandidateTest;

import java.util.List;

public interface CandidateTestService {
    CandidateTest create(String recruiterId, CandidateTest candidateTest);

    List<CandidateTest> findAllByCandidateId(String candidateId);

    List<CandidateTest> findAllByRecruiterId(String recruiterId);

    void delete(String recruiterId, String candidateTestId);

    CandidateTest findByRecruiterId(String recruiterId, String candidateTestId);

    CandidateTest findByCandidateId(String candidateId, String candidateTestId);

    void update(CandidateTest candidateTest);
}
