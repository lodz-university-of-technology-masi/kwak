import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class CandidateTestsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    isFilled(candidateTest) {
        if (candidateTest.questions.length === this.getTest(candidateTest.testId)) {
            return true;
        }
        return false;
    };

    getResult(candidateTest) {
        if (this.isFilled(candidateTest)) {
            let result = 0;
            candidateTest.questions.forEach(e => e.isCorrect === true && result++);
            return result;
        }
        return "-";
    };

    getTest(testId) {
        return this.props.allTests.filter(test => test.id === testId)[0];
    };

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Language</th>
                        <th scope="col">Result</th>
                        <th scope="col" className="text-right"/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.candidateTests.map((candidateTest) => (
                        <tr>
                            <td><span id="testId"
                            >{candidateTest.testId}</span>
                            </td>
                            <td><span id="testName">
                                       {this.getTest(candidateTest.testId).title}
                            </span></td>
                            <td><span id="testName">
                                       {this.getTest(candidateTest.testId).lang}
                        </span></td>
                            <td><span id="result">{this.getResult(candidateTest)}</span></td>
                            <td className="text-right">
                                <Link to={`/tests/${candidateTest.testId}`}>
                                    <button type="button" className="btn btn-secondary"
                                            disabled={this.isFilled(candidateTest)}>Solve
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

}