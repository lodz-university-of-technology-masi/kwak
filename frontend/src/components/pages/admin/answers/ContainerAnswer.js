import React from 'react';

export class ContainerAnswer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: this.props.entry.content
        };
    }

    onAnswerTextChange(e) {
        this.setState({content: e.target.value});
        this.props.changeAnswerTextHandler(this.props.id, e.target.value);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>
                    <input type="text" className="form-control" value={this.state.content}
                           onChange={this.onAnswerTextChange.bind(this)}/>
                </td>
                <td>
                    <select className="form-control" value={this.props.entry.isCorrect}
                            onChange={(e) => this.props.changeAnswerIsCorrectHandler(this.props.id, e.target.value)}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </td>
                <td>
                    <button type="button" className="btn btn-secondary"
                            onClick={() => this.props.removeHandler(this.props.id)}>Remove
                    </button>
                </td>
            </tr>
        )
    }
}