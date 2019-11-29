import React from 'react';
import {
    Switch,
    Route,
    withRouter, Link
} from "react-router-dom";
import {API} from "aws-amplify";
import AssignTest from "./AssignTest";

class CandidatesPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            candidates: [],
            loading: true,
        };
    }

    async componentDidMount() {
        this.setState({
            candidates: await API.get('kwakApi', '/candidates', {}),
            tests: await API.get('kwakApi', '/tests', {}),
            loading: false
        });
    }

    onTestAssigned = (candidate, test) => {
        API.post('kwakApi', `/candidates/${candidate.id}/tests`, {
           body: { testId: test.id }
        }).then((response) => {
            console.log(response);
        })
    };

    render() {
        const {match} = this.props;
        const {tests, candidates, loading} = this.state;
        return (
            <Switch>
                <Route path={`${match.path}/assign`}>
                    <AssignTest onTestAssigned={this.onTestAssigned} tests={tests} candidates={candidates} />
                </Route>
                <Route exact path={match.path}>
                    <Link to={`${match.url}/assign`}>
                        <button className="btn btn-secondary">Assign test</button>
                    </Link>
                    {loading && <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
                    {!loading && <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Login</th>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {candidates.map(candidate => {
                                return (
                                    <tr key={candidate.id}>
                                        <td>{candidate.id}</td>
                                        <td>{candidate.login}</td>
                                        <td>{candidate.email}</td>
                                        <td>{`${candidate.name} ${candidate.surname}`}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>}
                </Route>
            </Switch>
        )
    }
}

export default withRouter(CandidatesPanel);