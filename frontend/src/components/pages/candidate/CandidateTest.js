import React, {Component} from 'react';
import {API, Auth} from "aws-amplify";
import {Route, Switch, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Test} from "../Test";

export default class CandidateTest extends Component {
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

    render() {
        return (
            <div className="container d-flex p-3 flex-column ">
                <header className="mb-3">
                    <nav className="navbar navbar-light">
                        <a className="navbar-brand">Recruiter</a>
                    </nav>
                </header>

                <main role="main">
                    <div id="errorBox" style="display: none;" className="alert alert-danger" role="alert"/>
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
                            <tr>
                                <td><input type="text" className="form-control" id="testId" disabled/></td>
                                <td><input type="text" className="form-control" id="result" disabled/></td>
                                <td className="text-right">
                                    <div className="btn-group ">
                                        <button id="solveButton" type="button" className="btn btn-secondary">Solve
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </main>

                <footer>
                    Recruiter v0.1
                </footer>
            </div>
        );
    }
}