const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const buttonPerformRegistration = document.querySelector("#buttonPerformRegistration");
const buttonCancelRegistration = document.querySelector("#buttonCancelRegistration");
const buttonLogin = document.querySelector("#buttonLogin");
const buttonRegister = document.querySelector("#buttonRegister");

function showLoginForm() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
}

function showRegisterForm() {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
}

function login() {
    if (validate()) {
        //try to login
    }
}

function register() {
    if (validate()) {
        //register
    }
}

function validate() {
    const form = document.querySelector("form:not(.hidden)");
    form.classList.add('was-validated');
    return form.checkValidity();
}

buttonLogin.addEventListener('click', function () {
    login();
});

buttonRegister.addEventListener('click', function () {
    showRegisterForm();
});

buttonPerformRegistration.addEventListener('click', function () {
    register();
});

buttonCancelRegistration.addEventListener('click', function () {
    showLoginForm();
});

showLoginForm();