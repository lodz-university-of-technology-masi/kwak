import React from 'react';

export class ContainerQuestion extends React.Component {
    state = {
        description:null
    };
    componentDidMount() {
        this.setState({description: this.props.entry.description});
    }
    onQuestionTextChange(e){
        this.setState({description: e.target.value});
        this.props.changeDescriptionHandler(this.props.id,e.target.value);
    }
    render() {
        return (
            <tr>
                <th scope="row">{this.props.entry.id}</th>
                <td>
                    <input type="text" className="form-control" id="questionText" value={this.state.description}
                           onChange={this.onQuestionTextChange.bind(this)}/>
                </td>
                <td>
                    <select className="form-control" id="QuestionType" value={this.props.entry.type}
                            onChange={(e)=>this.props.changeQuestionTypeHandler(this.props.id,e.target.value)}>
                        <option value="W">choose</option>
                        <option value="O">open</option>
                        <option value="L">number</option>
                    </select>
                </td>
                <td className="text-right">
                    <div className="btn-group">
                        <button id="showAnswersButton" type="button" className="btn btn-secondary"
                                onClick={() => this.props.showAnswersHandler(this.props.id)}>Answers
                        </button>
                        <button id="removeQuestionButton" type="button" className="btn btn-secondary"
                                onClick={() => this.props.removeHandler(this.props.id)}>Remove
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}