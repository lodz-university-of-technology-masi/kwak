import { signUp, logIn as cognitoLogin, getUserAttributes, getUserFromLocalStorage } from "./cognito.js";
import { showError, clearError } from "./errors.js";
import './components/user-panel.js';

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const userPanel = document.querySelector("#userPanel");
const userPanelContainer = document.querySelector("#userPanelContainer");
const logoutButton = document.querySelector("#logoutButton");


const buttonPerformRegistration = document.querySelector("#buttonPerformRegistration");
const buttonCancelRegistration = document.querySelector("#buttonCancelRegistration");
const buttonLogin = document.querySelector("#buttonLogin");
const buttonRegister = document.querySelector("#buttonRegister");


function showLoginForm() {
    clearError();
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    userPanelContainer.classList.add("hidden");
}

function showRegisterForm() {
    clearError();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
}

async function showUserPanel(user) {
    loginForm.classList.add("hidden");
    registerForm.classList.add("hidden");
    userPanelContainer.classList.remove("hidden");

    const attributes = await getUserAttributes(user);
    userPanel.setAttribute("name", `${attributes.given_name} ${attributes.family_name}`);
}


async function login() {
    clearError();

    if (validate()) {
        const formData = new FormData(loginForm);
        const userLogin = formData.get('userLogin');
        const userPassword = formData.get('userPassword');
        const spinner = loginForm.querySelector('.spinner')

        try {
            spinner.classList.remove("hidden");
            const user = await cognitoLogin(userLogin, userPassword);
            await showUserPanel(user);
        } catch (error) {
            showError(error.message);
        }

        spinner.classList.add("hidden");
    }
}

async function register() {
    if (validate()) {
        //register
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
    showRegisterForm();
});

buttonPerformRegistration.addEventListener('click', async function () {
    await register();
});

buttonCancelRegistration.addEventListener('click', function () {
    showLoginForm();
});

logoutButton.addEventListener('click', async () => {
    const user = await getUserFromLocalStorage();
    if (user != null ){
        user.signOut();
    }
    showLoginForm();
});


getUserFromLocalStorage().then(async (user) => {
    if (user == null) {
        showLoginForm();
        return;
    }

    await showUserPanel(user);
}).catch(() => {
    showLoginForm();
});

