import React from 'react';
import {HeaderQuestions} from "./HeaderQuestions";
import {getTest} from "../../../../utils/api";
import {ContainerQuestion} from "./ContainerQuestion";

export class PanelQuestions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: getTest(this.props.location.state.testId)
        };
    }

    removeHandler(index) {
        let newTest = Object.create(this.state.test);
        newTest.questions.splice(index, 1);
        this.setState({tests: newTest});
    }

    addHandler() {
        let newTest = Object.create(this.state.test);
        newTest.questions.push({"title": "", "description": "", "code": "", "type": ""});
        this.setState({test: newTest});
    }

    returnHandler() {
        this.props.history.push({
            pathname: '/admin',
        });
    }

    changeQuestionTextHandler(index, newQuestionText) {
        let newTest = Object.create(this.state.test);
        newTest.questions[index].description = newQuestionText;
        this.setState({tests: newTest});
    }

    changeQuestionTypeHandler(index, newQuestionType) {
        let newTest = Object.create(this.state.test);
        newTest.questions[index].type = newQuestionType;
        this.setState({tests: newTest});
    }

    showAnswersHandler(questionId) {
        let testId = this.props.location.state.testId;
        this.props.history.push({
            pathname: '/answers',
            search: '?testId=' + testId + "&questionId=" + questionId,
            state: {
                answers: this.state.test.questions[questionId].answers,
                testId: testId
            }
        });
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <HeaderQuestions addHandler={this.addHandler.bind(this)}
                                     returnHandler={this.returnHandler.bind(this)}/>
                    </thead>
                    <tbody>
                    {this.state.test.questions.map((item, index) => {
                        return <ContainerQuestion key={index} id={index} entry={item}
                                                  removeHandler={this.removeHandler.bind(this)}
                                                  changeDescriptionHandler={this.changeQuestionTextHandler.bind(this)}
                                                  changeQuestionTypeHandler={this.changeQuestionTypeHandler.bind(this)}
                                                  showAnswersHandler={this.showAnswersHandler.bind(this)}/>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}