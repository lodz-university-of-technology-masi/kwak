package recruitmentapi.services;

import recruitmentapi.endpoints.tests.model.Test;

import java.util.List;

public interface TestService {
    List<Test> findAll(String recruiterId);

    Test findById(String recruiterId, String testId);

    List<Test> findByParent(String parentId);

    Test create(String recruiterId, Test test);

    void delete(String recruiterId, String testId);

    void update(Test test);
}
