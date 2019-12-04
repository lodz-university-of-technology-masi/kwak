import React, {Component} from 'react';
import {API, Auth} from "aws-amplify";
import {Route, Switch, Link} from "react-router-dom";
import {Test} from "../Test";

export default class CandidateHome extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            candidateTests: [],
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
        if (this._isMounted) {
            this.setState({
                candidateTests,
                loading: false
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    solveHandler() {

    }

    render() {
        const {candidateTests, loading} = this.state;
        return (
            <Switch>
                <Route path="/tests/:testId" component={Test}/>
                <Route path="/">
                    <div className="container d-flex p-3 flex-column ">
                        <header className="mb-3">
                            <nav className="navbar navbar-light">
                                <a className="navbar-brand">Recruiter</a>
                                {loading && <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}
                            </nav>
                        </header>

                        <main role="main">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Result</th>
                                        <th scope="col" className="text-right"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {candidateTests.map(candidateTest => (
                                        <tr>
                                            <td><input type="text" className="form-control" id="testId" value={candidateTest.testId} disabled/></td>
                                            <td><input type="text" className="form-control" id="result" disabled/></td>
                                            <td className="text-right">
                                                <button id="solveButton" type="button" className="btn btn-secondary" onClick={this.solveHandler(candidateTest.testId)}>
                                                    Solve
                                                </button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </main>

                        <footer>
                            Recruiter v0.1
                        </footer>
                    </div>
                </Route>
            </Switch>
        );
    }
}