import React, {Component} from 'react';
import {API, Auth} from "aws-amplify";
import {Route, Switch} from "react-router-dom";
import {Test} from "../Test";
import CandidateTestsComponent from "./CandidateTestsComponent";
export default class CandidateHome extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            candidateTests: [],
            allTests: [],
            loading: false
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.setState({
            loading: true
        });

        const currentSession = await Auth.currentSession();
        const {sub: candidateId} = currentSession.getAccessToken().decodePayload();
        const candidateTests = await API.get('kwakApi', `/candidates/${candidateId}/tests`, {});
        const allTests = await API.get('kwakApi', `/tests`, {});
        if (this._isMounted) {
            this.setState({
                candidateTests,
                allTests,
                loading: false
            });
        }
    }
    logOut(){
       Auth.signOut({ global: true }).then();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const {candidateTests, allTests, loading} = this.state;
        return (
                <div className="container d-flex p-3 flex-column ">
                    <header className="mb-3">
                        <nav className="navbar navbar-light">
                            <a href="/" className="navbar-brand">Recruiter</a>
                            {loading && <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                            <button type="button" className="btn btn-secondary" onClick={this.logOut}>Logout</button>
                        </nav>
                    </header>

                    <main role="main">
                        <Switch>
                            <Route path="/tests/:testId" component={Test}/>
                            <Route path="/">
                                <CandidateTestsComponent candidateTests={candidateTests} allTests={allTests}/>
                            </Route>
                        </Switch>
                    </main>

                    <footer>
                        Recruiter v0.1
                    </footer>
                </div>
        );
    }
}