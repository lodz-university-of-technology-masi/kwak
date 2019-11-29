import React, {Component} from 'react';
import {
    Redirect
} from "react-router-dom";

class AssignTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCandidate: null,
            selectedTest: null,
            redirect: false
        }

    }

    onTestSelected = (test) => {
        this.setState({
            selectedTest: test
        });
    };

    onCandidateSelected = (candidate) => {
        this.setState({
            selectedCandidate: candidate
        });
    };

    onSubmit = () => {
        const { selectedCandidate, selectedTest } = this.state;
        const { onTestAssigned } = this.props;
        if (selectedCandidate && selectedTest) {
            onTestAssigned(selectedCandidate, selectedTest);
            this.setState({
                redirect: true
            });
        }
    };

    render() {
        const {tests, candidates} = this.props;
        const {redirect, selectedCandidate, selectedTest, } = this.state;
        if (redirect) {
            return <Redirect to={'/candidates'}/>
        }
        return (
            <div>
                <h2>Tests</h2>
                <h3>Selected candidate: {selectedCandidate && selectedCandidate.id}</h3>
                <h3>Selected test: {selectedTest && selectedTest.id}</h3>
                <table>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test.id}>
                                <td>{test.title}</td>
                                <td>{test.id}</td>
                                <td><button onClick={() => this.onTestSelected(test)}>Select</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>Candidates</h2>
                <table>
                    <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.login}</td>
                            <td>{candidate.id}</td>
                            <td><button onClick={() => this.onCandidateSelected(candidate)}>Select</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button onClick={this.onSubmit}>Assign</button>
            </div>
        );
    }
}

export default AssignTest;