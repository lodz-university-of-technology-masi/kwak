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

    render() {
        const {candidateTests, loading} = this.state;
        return (
            <Switch>
                <Route path="/tests/:testId" component={Test}/>
                <Route path="/">
                    <div>
                        {loading && <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}
                        <h2>Assigned tests</h2>
                        <ul>
                            {candidateTests.map(candidateTest => (
                                <li key={candidateTest.testId}>
                                    Test Id: {candidateTest.testId}
                                    <Link to={`/tests/${candidateTest.testId}`}>
                                        <button>Solve</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Route>
            </Switch>
        );
    }
}