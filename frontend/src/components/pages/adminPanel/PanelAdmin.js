import React from 'react';
import './../../../errors.css'
import './../../../test.css'
import { Route, Switch } from 'react-router-dom'
import {PanelTests} from "./tests/PanelTests";
import {PanelQuestions} from "./questions/PanelQuestions";
import {PanelAnswers} from "./answers/PanelAnswers";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export class PanelAdmin extends React.Component {
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                <div key={this.props.location.pathname}>
                    <Switch>
                        <Route path='/admin' component={PanelTests} />
                        <Route path='/questions' component={PanelQuestions} />
                        <Route path='/answers' component={PanelAnswers} />
                    </Switch>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}
