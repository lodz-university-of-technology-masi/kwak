import React from 'react';
import {
    Switch,
    Route,
    withRouter, Link
} from "react-router-dom";
import {API} from 'aws-amplify';
import {TestRow} from "./TestRow";
import AddTest from "./AddTest";

class TestsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
            loading: true,
        };
    }

    async componentDidMount() {
        this.setState({
            tests: await API.get('kwakApi', '/tests', {}),
            loading: false
        });
    }

    onTestAdded = (test) => {
        API.post('kwakApi', '/tests', {body: test})
            .then((test) => {
                this.setState((previousState) => ({
                    tests: [...previousState.tests, test]
                }));
            });
    };

    onTestRemove = (test) => {
        const {tests} = this.state;
        API.del('kwakApi', `/tests/${test.id}`, {})
            .then(() => {
                this.setState({
                    tests: tests.filter(t => t.id !== test.id)
                });
            });
    };

    onTestEdit = (test) => {

    };

    render() {
        const {match} = this.props;
        const {tests, loading} = this.state;
        return (
            <Switch>
                <Route exact path={`${match.path}/add`}>
                    <AddTest onTestAdded={this.onTestAdded}/>
                </Route>
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
                                <th scope="col">Title</th>
                                <th scope="col" className="text-right">
                                    <Link to={`${match.url}/add`}>
                                        <button className="btn btn-secondary">Add test</button>
                                    </Link>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {tests.map(test => {
                                return <TestRow key={test.id} test={test}
                                                onTestRemove={this.onTestRemove}
                                                onTestEdit={this.onTestEdit}/>
                            })}
                            </tbody>
                        </table>
                    </div>}
                </Route>
            </Switch>

        )
    }
}

export default withRouter(TestsPanel);