package recruitmentapi.services;

import recruitmentapi.endpoints.candidates.model.Candidate;

import java.util.List;

public interface CognitoService {
    Candidate findCandidateById(String candidateId);

    Candidate createCandidate(Candidate candidate);

    List<Candidate> findAllCandidates();

    void deleteCandidate(String id);
}
