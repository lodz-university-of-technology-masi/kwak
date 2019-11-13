import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-1_39RRFUwM7',
    ClientId: '523h3g3q7uetbvaovba7ur428j'
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function signUp(name, surname, email, login, password) {
    const attributes = [
        new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: 'email',
                Value: email
            }
        ),
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'given_name',
            Value: name
        }),
        new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'family_name',
            Value: surname
        })
    ];

    return new Promise((resolve, reject) => {
        userPool.signUp(login, password, attributes, null, function(err, result){
            if (err) {
                reject(err);
                return;
            }

            resolve(result.user);
        });
    });
}

function confirmRegistration(cognitoUser, code) {
    return new Promise ((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
    })
}

function logIn(username, password) {
    const userData = {
        Username: username,
        Pool: userPool
    };

    return new Promise((resolve, reject) => {
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
                Username: username,
                Password: password
            });

        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                resolve(cognitoUser);
            },
            onFailure: function(err) {
                reject(err);
            }
        });
    });
}

function getUserAttributes(user) {
    return new Promise((resolve, reject) => {
        user.getUserAttributes((err, attributes) => {
            if (err) {
                reject(err);
                return;
            }
            const mappedAttributes = {};
            for (let attribute of attributes) {
                mappedAttributes[attribute.Name] = attribute.Value;
            }

            resolve(mappedAttributes);
        })
    });
}

function getUserFromLocalStorage() {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (user != null) {
            user.getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!session.isValid()) {
                    reject({ message: 'Session is not valid'});
                    return;
                }

                resolve(user);
            });
        }

        resolve(null);
    });
}

export { signUp, confirmRegistration, logIn, getUserAttributes, getUserFromLocalStorage }