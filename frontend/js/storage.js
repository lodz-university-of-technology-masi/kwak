export function saveAnswers(testId, question, answers) {
    if (!localStorage.getItem("tests")) {
        localStorage.setItem("tests", "{}");
    }

    const tests = JSON.parse(localStorage.getItem("tests"));
    if (!tests[testId]) {
        tests[testId] = {};
    }

    const test = tests[testId];
    if (!test[question]) {
        test[question] = [];
    }

    test[question] = answers;
    localStorage.setItem("tests", JSON.stringify(tests));
}

export function getAnswers(testId, question) {
    if (!localStorage.getItem("tests")) {
        return [];
    }

    const tests = JSON.parse(localStorage.getItem("tests"));
    if (!tests[testId] || !tests[testId][question]) {
        return [];
    }

    return tests[testId][question];
}