const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const buttonPerformRegistration = document.querySelector("#buttonPerformRegistration");
const buttonCancelRegistration = document.querySelector("#buttonCancelRegistration");
const buttonLogin = document.querySelector("#buttonLogin");
const buttonRegister = document.querySelector("#buttonRegister");

function showLoginForm() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    buttonLogin.addEventListener('click', function () {
        login();
    });

    buttonRegister.addEventListener('click', function () {
        showRegisterForm();
    });
}

function showRegisterForm() {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    buttonPerformRegistration.addEventListener('click', function () {
        register();
    });

    buttonCancelRegistration.addEventListener('click', function () {
        showLoginForm();
    });
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
    let isValid = false;
    let forms = document.getElementsByClassName('needs-validation');
    Array.prototype.filter.call(forms, function (form) {
        form.classList.add('was-validated');
        isValid = form.checkValidity();
    });
    return isValid;
}

showLoginForm();