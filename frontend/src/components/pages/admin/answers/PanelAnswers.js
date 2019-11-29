import React from 'react';
import {HeaderAnswers} from "./HeaderAnswers";
import {ContainerAnswer} from "./ContainerAnswer";

export class PanelAnswers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: this.props.location.state.answers,
            testId: this.props.location.state.testId
        };
    }

    removeHandler(index) {
        let newAnswers = [...this.state.answers];
        newAnswers.splice(index, 1);
        this.setState({answers: newAnswers});
    }

    addHandler() {
        let newAnswers = [...this.state.answers];
        newAnswers.push({"content": "", "isCorrect": false});
        this.setState({answers: newAnswers});
    }

    returnHandler() {
        this.props.history.push({
            pathname: '/questions',
            search: '?testId=' + this.state.testId,
            state: {
                testId: this.state.testId
            }
        });
    }

    changeAnswerTextHandler(index, newQuestionText) {
        let newAnswers = [...this.state.answers];
        newAnswers[index].content = newQuestionText;
        this.setState({answers: newAnswers});
    }

    changeAnswerIsCorrectHandler(index, isCorrect) {
        let newAnswers = [...this.state.answers];
        newAnswers[index].isCorrect = isCorrect;
        this.setState({answers: newAnswers});
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                    <HeaderAnswers addHandler={this.addHandler.bind(this)}
                                   returnHandler={this.returnHandler.bind(this)}/>
                    </thead>
                    <tbody>
                    {this.state.answers.map((item, index) => {
                        return <ContainerAnswer key={index} id={index} entry={item}
                                                removeHandler={this.removeHandler.bind(this)}
                                                changeAnswerTextHandler={this.changeAnswerTextHandler.bind(this)}
                                                changeAnswerIsCorrectHandler={this.changeAnswerIsCorrectHandler.bind(this)}/>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}