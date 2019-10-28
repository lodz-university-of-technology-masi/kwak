export function getTest(testId) {
    return {
        "id": "abcd",
        "title": "Jakiś test",
        "lang": "pl",
        "questions": [
            {
                "title": "title",
                "description": "description",
                "code": "code",
                "type": "single",
                "answers": [{"content": "answer 1"}, {"content": "answer 2"}, {"content": "answer 3"}]
            },
            {
                "title": "ADAM",
                "description": "1234",
                "code": "bbb",
                "type": "multi",
                "answers": [{"content": "1"}, {"content": "2"}]
            },
            {
                "title": "ADAxd",
                "description": "1234",
                "code": "bbb",
                "type": "open",
            }
        ]
    }
}
