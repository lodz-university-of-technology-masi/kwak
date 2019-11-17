import React from 'react';
import './../../../errors.css'
import { Route, Switch } from 'react-router-dom'
import {PanelTests} from "./tests/PanelTests";
import {PanelQuestions} from "./questions/PanelQuestions";
import {PanelAnswers} from "./answers/PanelAnswers";

export class PanelAdmin extends React.Component {
    render() {
        return (
            <div>
                <div id="errorBox" className="alert alert-danger" role="alert"></div>
                <Switch>
                    <Route path='/admin' component={PanelTests} />
                    <Route path='/questions' component={PanelQuestions} />
                    <Route path='/answers' component={PanelAnswers} />
                </Switch>
            </div>
        )
    }
}
