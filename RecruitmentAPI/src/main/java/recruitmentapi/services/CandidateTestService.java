package recruitmentapi.services;

import recruitmentapi.model.CandidateTest;

import java.util.List;

public interface CandidateTestService {
    CandidateTest create(String recruiterId, CandidateTest candidateTest);

    List<CandidateTest> findAllByCandidateId(String candidateId);

    List<CandidateTest> findAllByRecruiterId(String recruiterId);

    void delete(String recruiterId, String candidateTestId);

    CandidateTest findByRecruiterId(String recruiterId, String candidateTestId);

    CandidateTest findByCandidateId(String candidateId, String candidateTestId);

    void deleteByCandidateId(String candidateId);

    void update(CandidateTest candidateTest);
}
