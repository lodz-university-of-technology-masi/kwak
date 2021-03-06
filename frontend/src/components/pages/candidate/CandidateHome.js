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

        const refreshTests = async () => {
            const candidateTests = await API.get('kwakApi', `/candidatetests?candidate=1`, {});
            if (this._isMounted) {
                this.setState({
                    candidateTests,
                    loading: false
                });
            }
        };

        await refreshTests();
        setInterval(async () => {
            await refreshTests();
        }, 3000);
    }
    logOut(){
       Auth.signOut({ global: true }).then();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const {candidateTests, loading} = this.state;
        return (
                <div className="container d-flex p-3 flex-column ">
                    <header className="mb-3">
                        <nav className="navbar navbar-light">
                            <a href="/" className="navbar-brand">Recruiter</a>
                            <button type="button" className="btn btn-secondary" onClick={this.logOut}>Logout</button>
                        </nav>
                    </header>

                    <main role="main">
                        <Switch>
                            <Route path="/tests/:candidateTestId" component={Test}/>
                            <Route path="/">
                                <CandidateTestsComponent loading={loading} candidateTests={candidateTests}/>
                            </Route>
                        </Switch>
                    </main>
                </div>
        );
    }
}
