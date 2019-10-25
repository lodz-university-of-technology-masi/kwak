const content = document.querySelector("#content");
const loginFormTemplate = ` <form id="loginForm" class="form-group needs-validation col-12 col-sm-10 col-md-7 col-lg-5 appear " novalidate>
 <div>
                <label for="userLogin">Login</label>
                <input type="text" class="form-control mb-2" id="userLogin" placeholder="Enter username"  required>
                <div class="invalid-feedback">
                  Please input a valid username.
                </div>
                </div>
                <div>
                <label for="userPassword">Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="Password"  required>
                <div class="invalid-feedback">
                  Please input a valid password.
                </div>
                </div>
                <div class="btn-group mt-3 d-flex justify-content-between">
                    <button id="buttonLogin" type="button" class="btn btn-primary float-left col-4">Login</button>
                    <small class=" text-muted pr-3 pl-3 text-right ">You don't have account?</small>
                    <button id="buttonRegister" type="button" class="btn btn-primary col-4">Register</button>
                </div>
            </form>`;
const registerFormTemplate = ` <form id="registerForm" class="form-group needs-validation col-12 col-sm-10 col-md-7 col-lg-5 appear" novalidate>
 <div>
                <label for="userFirstNameR">First name</label>
                <input type="text" class="form-control mb-2" id="userFirstNameR" placeholder="Enter first name" required>
                <div class="invalid-feedback">
                  Please input a valid first name.
                </div>
                </div><div>
                <label for="userLastNameR">Last name</label>
                <input type="text" class="form-control mb-2" id="userLastNameR" placeholder="last name" required>
                <div class="invalid-feedback">
                  Please input a valid last name.
                </div>
                </div><div>
                <label for="userLogin">Login</label>
                <input type="text" class="form-control mb-2" id="userLoginR" placeholder="login" required> 
                <div class="invalid-feedback">
                  Please input a valid login.
                </div>
                </div><div>
                <label for="userPasswordR">Password</label>
                <input type="password" class="form-control" id="userPasswordR" placeholder="Password" required>
                <div class="invalid-feedback">
                  Please input a valid password.
                </div>
                </div>
                <div class="btn-group mt-3 d-flex">
                    <button id="buttonCancelRegistration" type="button" class="btn btn-primary mr-1">Cancel</button>
                    <button id="buttonPerformRegistration" type="button" class="btn btn-primary ">Register</button>
                </div>
            </form>`;

function showLoginForm() {
    content.innerHTML = loginFormTemplate;
    const buttonLogin = document.querySelector("#buttonLogin");
    const buttonRegister = document.querySelector("#buttonRegister");
    buttonLogin.addEventListener('click', function () {
        login();
    });
    buttonRegister.addEventListener('click', function () {
        showRegisterForm();
    });

}

function showRegisterForm() {
    content.innerHTML = registerFormTemplate;
    const buttonPerformRegistration = document.querySelector("#buttonPerformRegistration");
    const buttonCancelRegistration = document.querySelector("#buttonCancelRegistration");
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