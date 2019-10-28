import { signUp, logIn as cognitoLogin, getUserAttributes, getUserFromLocalStorage, confirmRegistration } from "./cognito.js";
import { showError, clearError } from "./errors.js";
import './components/user-panel.js';
import './components/container.js';

const container = document.querySelector("r-container");

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const confirmationForm = document.querySelector("#confirmationForm");
const userPanel = document.querySelector("#userPanel");
const userPanelContainer = document.querySelector("#userPanelContainer");


const buttonPerformRegistration = document.querySelector("#buttonPerformRegistration");
const buttonCancelRegistration = document.querySelector("#buttonCancelRegistration");
const buttonLogin = document.querySelector("#buttonLogin");
const buttonRegister = document.querySelector("#buttonRegister");
const confirmationButton = document.querySelector("#confirmationButton");
const logoutButton = document.querySelector("#logoutButton");

let registeringUser = null;

// Temporary function to demonstrate logic
async function loadUserData(user) {
    const attributes = await getUserAttributes(user);
    userPanel.setAttribute("name", `${attributes.given_name} ${attributes.family_name}`);
}

function switchForm(name) {
    clearError();
    container.setAttribute("target", name);
}

async function login() {
    clearError();

    if (validate()) {
        const spinner = loginForm.querySelector('.spinner');
        spinner.classList.remove("hidden");
        try {
            const formData = new FormData(loginForm);
            const user = await cognitoLogin(formData.get('userLogin'), formData.get('userPassword'));
            switchForm("userPanelContainer");
            await loadUserData(user);
            loginForm.reset();
            loginForm.classList.remove("was-validated");
        } catch (error) {
            showError(error.message);
        }

        spinner.classList.add("hidden");
    }
}

async function register() {
    if (validate()) {
        const spinner = registerForm.querySelector('.spinner');
        spinner.classList.remove("hidden");
        try {
            const formData = new FormData(registerForm);
            registeringUser = await signUp(formData.get('userFirstNameR'), formData.get('userLastNameR'), formData.get('userMailR'), formData.get('userLoginR'), formData.get('userPasswordR'));
            switchForm("confirmationForm");
            registerForm.reset();
            registerForm.classList.remove("was-validated");
        } catch (error) {
            showError(error.message);
        }
        spinner.classList.add("hidden");
    }
}

async function confirmUser(user) {
    clearError();
    if (validate()) {
        const spinner = confirmationForm.querySelector(".spinner");
        spinner.classList.remove("hidden");
        try {
            const formData = new FormData(confirmationForm);
            await confirmRegistration(user, formData.get("confirmationCode"));
            switchForm("loginForm");
            confirmationForm.reset();
        } catch (error) {
            showError(error.message);
        }
        spinner.classList.add("hidden");
    }
}

function validate() {
    const form = document.querySelector("form:not(.hidden)");
    form.classList.add('was-validated');
    return form.checkValidity();
}

buttonLogin.addEventListener('click', async function () {
    await login();
});

buttonRegister.addEventListener('click', function () {
    switchForm("registerForm");
});

buttonPerformRegistration.addEventListener('click', async function () {
    await register();
});

buttonCancelRegistration.addEventListener('click', function () {
    switchForm("loginForm");
});

logoutButton.addEventListener('click', async () => {
    const user = await getUserFromLocalStorage();
    if (user != null ){
        user.signOut();
    }
    switchForm("loginForm");
});

confirmationButton.addEventListener('click', async () => {
    await confirmUser(registeringUser);
});


getUserFromLocalStorage().then(async (user) => {
    if (user == null) {
        switchForm("loginForm");
        return;
    }

    await loadUserData(user);
}).catch(() => {
    switchForm("loginForm");
});

