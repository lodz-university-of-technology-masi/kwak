import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {API} from "aws-amplify";

export default class CandidateTestsComponent extends Component {
    getResult=function(candidateTest){
        let result=0;
        candidateTest.questions.forEach(e=> e.isCorrect.equal(true)&&result++);
    return result;
    };
    async render() {
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
                            <td><input type="text" className="form-control" id="testId" value={candidateTest.testId}
                                       disabled/></td>
                            <td><input type="text" className="form-control" id="testName"
                                       value={API.get('kwakApi', `/tests/${candidateTest.testId}`, {}).title}
                                       disabled/></td>
                            <td><input type="text" className="form-control" id="testName"
                                       value={API.get('kwakApi', `/tests/${candidateTest.testId}`, {}).lang}
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
        return 1;
    }
}