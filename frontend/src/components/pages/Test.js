import React from 'react';
import { Question } from '../Question.js'
import { QuestionCounter } from '../QuestionCounter.js'
import { AnswerList } from "../AnswerList.js";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getTest } from "../../utils/api.js";
import {getAnswers,saveAnswers} from "../../utils/storage.js";

export class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            test: null,
            responses: null,
        };

        this.prevQuestion = this.prevQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.responseChanged = this.responseChanged.bind(this);
    }

    // Load test data
    componentDidMount() {
        this.setState({test: getTest(0)});
    }

    changeQuestion(idx) {
        if (idx < 0 || idx >= this.state.test.questions.length) {
            return;
        }

        this.setState({
            currentQuestion: idx,
            responses: getAnswers(this.state.test.id, idx)
        });
    }

    responseChanged(responses) {
        saveAnswers(this.state.test.id, this.state.currentQuestion, responses);
    }

    prevQuestion() { this.changeQuestion(this.state.currentQuestion - 1); }
    nextQuestion() { this.changeQuestion(this.state.currentQuestion + 1); }

    render() {
        const question = this.state.test ? this.state.test.questions[this.state.currentQuestion] : {
            title: undefined,
            description: undefined,
            answers: undefined
        };

        const isFirstQuestion = this.state.currentQuestion === 0;
        const isLastQuestion = this.state.test && this.state.currentQuestion === this.state.test.questions.length - 1;

        return (
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                <div id="question" key={this.state.currentQuestion}>
                    <div className="card">
                        <div className="card-body">
                            <Question title={question.title || "Loading question"}
                                      description={question.description || "..."}/>
                        </div>
                    </div>

                    <div className="card" id="questionStatus">
                        <QuestionCounter
                            current={this.state.currentQuestion + 1}
                            total={this.state.test ? this.state.test.questions.length : 0}/>
                    </div>

                    <AnswerList
                        entries={question.answers || []}
                        responses={this.state.responses || []}
                        onUpdate={(responses) => this.responseChanged(responses)}/>

                    <div className="btn-group w-100" role="group">
                        <button onClick={this.prevQuestion} disabled={isFirstQuestion} className="btn btn-primary btn btn-block mt-2" type="button">
                            Poprzednie pytanie
                        </button>

                        <button onClick={this.nextQuestion} disabled={isLastQuestion} className="btn btn-primary btn btn-block mt-2" type="button">
                            Następne pytanie
                        </button>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}
