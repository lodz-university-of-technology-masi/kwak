package recruitmentapi.services;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserType;
import recruitmentapi.model.Candidate;

import java.util.Collection;
import java.util.List;

public interface CognitoService {
    Candidate findCandidateById(String candidateId);

    Candidate createCandidate(Candidate candidate);

    List<Candidate> findAllCandidates();

    void deleteCandidate(String id);
}
