import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class CandidateTestsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    isFilled(candidateTest) {
        return candidateTest.solved===true;
    };

    getResult(candidateTest) {
        if (this.isFilled(candidateTest)) {
            if(candidateTest.questions.filter(e=> e.correct===null).length===0){
                let result = 0;
                candidateTest.questions.forEach(e => e.correct === true && result++);
                return result+"/"+candidateTest.questions.length;
            }else{
                return "Waiting for rating";
            }
        }else{
            return "-";
        }
    };

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Language</th>
                        <th scope="col">Result</th>
                        <th scope="col" className="text-right"/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.candidateTests.map((candidateTest, key) => (
                        <tr key={key}>
                            <td><span>
                                       {candidateTest.title}
                            </span></td>
                            <td><span>
                                       {candidateTest.lang}
                        </span></td>
                            <td><span>{this.getResult(candidateTest)}</span></td>
                            <td className="text-right">
                                <Link to={`/tests/${candidateTest.id}`}>
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
