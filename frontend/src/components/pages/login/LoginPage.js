import React from 'react';
import { LoginContainer } from './LoginContainer.js';
import { RegisterContainer } from './RegisterContainer.js';
import { Route, Switch } from 'react-router-dom'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                <div key={this.props.location.pathname}>
                    {this.state.error ? <div className="alert alert-danger" role="alert"/> : null}
                    <div className="d-flex justify-content-center">
                        <Switch>
                            <Route path='/login' component={LoginContainer} />
                            <Route path='/register' component={RegisterContainer} />
                        </Switch>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}