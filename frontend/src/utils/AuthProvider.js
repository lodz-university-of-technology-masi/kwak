import {Auth} from "aws-amplify";

export const authProvider = {
    login: params => Promise.resolve(),
    logout: params => Auth.signOut({global: true}),
    checkAuth: params => Promise.resolve(),
    checkError: error => Promise.resolve(),
    getPermissions: params => Promise.resolve(),
};