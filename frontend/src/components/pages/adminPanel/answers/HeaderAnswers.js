import React from 'react';

export class HeaderAnswers extends React.Component {
    state={

    };
    render() {
        return(
            <tr>
                <th scope="col">#</th>
                <th scope="col" className="w-75">Answer text</th>
                <th scope="col" className="col-2">Correct</th>
                <th scope="col" className="text-right">
                    <div className="btn-group text-right">
                        <button id="AddAnswerButton" type="button" className="btn btn-secondary"
                                onClick={()=>this.props.addHandler()}>Add Answer</button>
                        <button id="hideAnswersButton" type="button" className="btn btn-secondary"
                                onClick={()=>this.props.returnHandler()}>Return</button>
                    </div>
                </th>
            </tr>
        )
    }
}