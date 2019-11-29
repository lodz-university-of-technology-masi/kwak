import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    withRouter
} from "react-router-dom";

import {ContainerTest} from ".././tests/ContainerTest";
import HeaderTests from ".././tests/HeaderTests";
import {getAllTests} from "../../../../utils/api";
import AddTest from "./AddTest";

class PanelTests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
        };

        this.removeHandler = this.removeHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
    }

    componentDidMount() {
        this.setState({tests: getAllTests()});
    }

    removeHandler(testId) {
        const {tests} = this.state;
        this.setState({
            tests: tests.filter(test => test.id !== testId)
        });
    }

    addHandler() {

    }

    editHandler(testId) {

    }

    render() {
        const {match} = this.props;
        return (
            <Switch>
                <Route path={`${match.path}/add`}>
                    <AddTest />
                </Route>
                <Route path={match.path}>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <HeaderTests addHandler={this.addHandler.bind(this)}/>
                            </thead>
                            <tbody>
                            {this.state.tests.map((test, index) => {
                                return <ContainerTest key={index} test={test}
                                                      removeHandler={this.removeHandler}
                                                      editHandler={this.editHandler}/>
                            })}
                            </tbody>
                        </table>
                    </div>
                </Route>
            </Switch>

        )
    }
}
export default withRouter(PanelTests);