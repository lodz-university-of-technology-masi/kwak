import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Test } from './components/pages/Test.js';
import { Login } from './components/pages/login/LoginPage.js';
import {PanelAdmin} from "./components/pages/adminPanel/PanelAdmin";

function App() {
  return (
    <Router>
        <div className="container d-flex p-3 flex-column ">
            <header>
                <nav className="navbar navbar-light">
                    <a className="navbar-brand" href="#">Recruiter</a>
                </nav>
            </header>

            <main role="main">
                <Switch>
                <Route exact path="/test" component={Test} />
                <Route path="/" component={PanelAdmin} />
                <Route path="/" component={Login} />
            </Switch>
            </main>

            <footer>
                Recruiter v0.1
            </footer>
        </div>
    </Router>
  );
}

export default App;
