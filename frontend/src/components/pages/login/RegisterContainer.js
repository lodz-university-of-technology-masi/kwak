import React from 'react';
import classNames from 'classnames/bind';
import {Link} from "react-router-dom";
import {signUp} from "../../../utils/cognito.js";

export class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            login: "",
            email: "",
            password: "",

            loggingIn: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.add('was-validated');

        if (event.target.checkValidity()) {
            this.setState({ loggingIn: true });
            const registeringUser = await signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.login, this.state.password);
            this.setState({ loggingIn: false });
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-group needs-validation col-12 col-sm-10 col-md-7 col-lg-5" noValidate>
                <div>
                    <label htmlFor="userFirstNameR">First name</label>
                    <input type="text" className="form-control mb-2"
                           value={this.state.firstName}
                           onChange={this.handleChange}
                           name="firstName"
                           placeholder="Enter first name" required/>

                    <div className="invalid-feedback">
                        Please provide valid first name
                    </div>
                </div>
                <div>
                    <label htmlFor="userLastNameR">Last name</label>
                    <input type="text" className="form-control mb-2"
                           value={this.state.lastName}
                           onChange={this.handleChange}
                           name="lastName"
                           placeholder="last name" required/>

                    <div className="invalid-feedback">
                        Please provide valid last name
                    </div>
                </div>
                <div>
                    <label htmlFor="userLogin">Login</label>
                    <input type="text" className="form-control mb-2"
                           value={this.state.login}
                           onChange={this.handleChange}
                           name="login"
                           placeholder="login" required/>

                    <div className="invalid-feedback">
                        Please provide valid login
                    </div>
                </div>
                <div>
                    <label htmlFor="userMailR">E-mail</label>
                    <input type="email" className="form-control mb-2"
                           value={this.state.email}
                           onChange={this.handleChange}
                           name="email"
                           placeholder="john@example.com" required/>

                    <div className="invalid-feedback">
                        Please provide valid email
                    </div>
                </div>
                <div>
                    <label htmlFor="userPasswordR">Password</label>
                    <input type="password" className="form-control"
                           value={this.state.password}
                           onChange={this.handleChange}
                           name="password"
                           minlength="8"
                           placeholder="Password" required/>

                    <div className="invalid-feedback">
                        Please provide valid password
                    </div>
                </div>
                <div className="btn-group mt-3 d-flex">
                    <Link to="/login" className="btn btn-primary mr-1">
                        Cancel
                    </Link>

                    <button type="submit" className="btn btn-primary">
                        <span>Register</span>
                        <div className={classNames('spinner', 'spinner-border', 'spinner-border-sm', {'hidden': !this.state.loggingIn})} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </button>
                </div>
            </form>
        );
    }
}