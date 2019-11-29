import React from 'react';
import {Route, Switch, Link} from "react-router-dom";
import {PanelTests} from "./tests/PanelTests";


export default function AdminHome(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Recruiter</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tests">Tests</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route path="/tests">
                    <PanelTests/>
                </Route>
            </Switch>
        </div>
    );
}