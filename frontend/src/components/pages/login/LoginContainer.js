import React from 'react';
import {Link} from "react-router-dom";
import {logIn} from "../../../utils/cognito.js";

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            loggingIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ loggingIn: true });
        const user = await logIn(this.state.login, this.state.password);
        this.setState({ loggingIn: false });

        this.props.history.push('/test')
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-group needs-validation col-12 col-sm-10 col-md-7 col-lg-5"
                  noValidate>
                <div>
                    <label htmlFor="userLogin">Login</label>
                    <input type="text" className="form-control mb-2" name="login"
                           placeholder="Enter username"
                           value={this.state.login}
                           onChange={this.handleChange}
                           required/>
                    <div className="invalid-feedback">
                        Please input a valid username.
                    </div>
                </div>
                <div>
                    <label htmlFor="userPassword">Password</label>
                    <input type="password" className="form-control" name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleChange}
                           required/>
                    <div className="invalid-feedback">
                        Please input a valid password.
                    </div>
                </div>
                <div className="btn-group mt-3 d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary float-left col-4">
                        <span>Login</span>
                        <div className="hidden spinner spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </button>
                    <small className="text-muted pr-3 pl-3 text-right ">You don't have account?</small>

                    <Link to="/register" className="btn btn-primary col-4">
                        Register
                    </Link>
                </div>
            </form>
        );
    }
}