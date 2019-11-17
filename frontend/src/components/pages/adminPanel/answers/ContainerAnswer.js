import React from 'react';

export class ContainerAnswer extends React.Component {
    state = {
        content: this.props.entry.content
    };

    onAnswerTextChange(e) {
        this.setState({content: e.target.value});
        this.props.changeAnswerTextHandler(this.props.id, e.target.value);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>
                    <input type="text" className="form-control" id="answerText" value={this.state.content}
                           onChange={this.onAnswerTextChange.bind(this)}/>
                </td>
                <td>
                    <select className="form-control" id="isCorrect" value={this.props.entry.isCorrect}
                            onChange={(e) =>this.props.changeAnswerIsCorrectHandler(this.props.id, e.target.value)}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </td>
                <td>
                    <button id="removeAnswer" type="button" className="btn btn-secondary"
                            onClick={() => this.props.removeHandler(this.props.id)}>Remove
                    </button>
                </td>
            </tr>
        )
    }
}