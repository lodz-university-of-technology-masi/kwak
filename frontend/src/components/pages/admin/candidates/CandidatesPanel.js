import React from 'react';
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import {API} from "aws-amplify";

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
            loading: false
        });
    }

    render() {
        const {match} = this.props;
        const {candidates, loading} = this.state;
        return (
            <Switch>
                <Route exact path={match.path}>
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