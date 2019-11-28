export function getTest(testId) {
    return {
        "id": 1,
        "title": "test1",
        "lang": "pl",
        "questions": [
            {
                "title": "title",
                "description": "description",
                "code": "code",
                "type": "Z",
                "answers": [{"content": "answer 1", "isCorrect":false}, {"content": "answer 2","isCorrect":true}, {"content": "answer 3","isCorrect":false}]
            },
            {
                "title": "ADAM",
                "description": "1234",
                "code": "bbb",
                "type": "O"
            },
            {
                "title": "ADAxd",
                "description": "1234",
                "code": "bbb",
                "type": "L",
            }
        ]
    }
}

export function getAllTests() {
    return [
        {
            "id": 1,
            "description": "test1",
            "lang": "pl"
        },
        {
            "id": 2,
            "description": "test2",
            "lang": "pl"
        }
    ]
}
