import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class CandidateTestsComponent extends Component {

    isFilled(candidateTest){
        if(candidateTest.questions.length!==0){
            return true;
        }
        return false;
    };
    getResult(candidateTest){
        if(this.isFilled(candidateTest)) {
            let result = 0;
            candidateTest.questions.forEach(e => e.isCorrect.equal(true) && result++);
            return result;
        }
        return "-";
    };
    getTest(testId){
        return this.props.allTests.filter(test=> test.id===testId)[0];
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
                    {this.props.candidateTests.map((candidateTest)=> (
                        <tr>
                            <td><input type="text" className="form-control" id="testId"
                                       value={candidateTest.testId}
                                       disabled/></td>
                            <td><input type="text" className="form-control" id="testName"
                                       value={this.getTest(candidateTest.testId).title}
                                       disabled/></td>
                            <td><input type="text" className="form-control" id="testName"
                                       value={this.getTest(candidateTest.testId).lang}
                                       disabled/></td>
                            <td><input type="text" className="form-control" id="result" disabled
                                       value={this.getResult(candidateTest)}/></td>
                            <td className="text-right">
                                <Link to={`/tests/${candidateTest.testId}`}>
                                    <button id="solveButton" type="button" className="btn btn-secondary">Solve</button>
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