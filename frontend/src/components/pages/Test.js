import React from 'react';
import {Question} from '../Question.js'
import {QuestionCounter} from '../QuestionCounter.js'
import {AnswerList} from "../AnswerList.js";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {getAnswers, saveAnswers} from "../../utils/Storage.js";
import {OpenAnswer} from "../OpenAnswer";
import {API, Auth} from 'aws-amplify';
import {NumericAnswer} from "../NumericAnswer";

export class Test extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            test: null,
            responses: [],
        };

        this.prevQuestion = this.prevQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.responseChanged = this.responseChanged.bind(this);
        this.renderQuestion = this.renderQuestion.bind(this);
    }

    // Load test data
    async componentDidMount() {
        this._isMounted = true;
        const {match: {params: {testId}}} = this.props;
        const test = await this.getCandidateTest(testId);
        if (this._isMounted) {
            this.setState({
                test: test,
                responses: getAnswers(test.id, this.state.currentQuestion)
            });
        }
    }


    async getCandidateTest(testId) {
        const currentSession = await Auth.currentSession();
        const {sub: candidateId} = currentSession.getAccessToken().decodePayload();
        const candidateTests = await API.get('kwakApi', `/candidates/${candidateId}/tests`, {});
        return candidateTests.filter((e) => e.testId === testId)[0];
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        this.setState({
            responses: responses
        });
        saveAnswers(this.state.test.id, this.state.currentQuestion, responses);
    }

    prevQuestion() {
        this.changeQuestion(this.state.currentQuestion - 1);
    }

    nextQuestion() {
        this.changeQuestion(this.state.currentQuestion + 1);
    }


    async sendResult() {
        let candidateTest = this.state.test;
        console.log(candidateTest);
        candidateTest.solved = true;
        for (let i = 0; i < candidateTest.questions.length; i++) {
            if (candidateTest.questions[i].type === "Z") {
                const selectedAnswers = getAnswers(candidateTest.id, i);
                for (let j = 0; j < candidateTest.questions[i].answers.length; j++) {
                    candidateTest.questions[i].answers[j].selected = selectedAnswers.includes(j);
                }
            } else {
                candidateTest.questions[i].answers = [{"content": getAnswers(candidateTest.id, i)}];
            }
        }
        await API.put('kwakApi', `/candidatetests/${candidateTest.id}`, {
            body:
            candidateTest
        });
    window.location.href = "/";
    }


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

                    {this.renderQuestion()}

                    <div className="btn-group w-100" role="group">
                        <button onClick={this.prevQuestion} disabled={isFirstQuestion}
                                className="btn btn-primary btn btn-block mt-2" type="button">
                            Poprzednie pytanie
                        </button>

                        <button onClick={isLastQuestion ? this.sendResult.bind(this) : this.nextQuestion}
                                className="btn btn-primary btn btn-block mt-2" type="button">
                            {isLastQuestion ? "Zakończ" : "Następne pytanie"}
                        </button>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        )
    }

    renderQuestion() {
        if (this.state.test) {
            const question = this.state.test.questions[this.state.currentQuestion];
            switch (question.type) {
                case 'Z':
                    return (
                        <AnswerList
                            entries={question.answers || []}
                            responses={this.state.responses || []}
                            onUpdate={(responses) => this.responseChanged(responses)}/>
                    );
                case 'O':
                    return (
                        <OpenAnswer
                            content={this.state.responses || ""}
                            onUpdate={(content) => this.responseChanged(content)}/>
                    );
                case 'L':
                    return (
                        <NumericAnswer
                            content={this.state.responses || ""}
                            onUpdate={(content) => this.responseChanged(content)}/>
                    );
            }
        }
    }
}
