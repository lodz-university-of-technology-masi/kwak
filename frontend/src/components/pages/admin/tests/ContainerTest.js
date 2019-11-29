import React from 'react';

export class ContainerTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: null
        };
    }

    componentDidMount() {
        this.setState({description: this.props.entry.description});
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value});
        this.props.changeHandler(this.props.id, e.target.value);
    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.entry.id}</th>
                <td>
                    <input type="text" className="form-control"
                           value={this.state.description}
                           onChange={this.onDescriptionChange.bind(this)}/>
                </td>
                <td className="text-right">
                    <div className="btn-group ">
                        <button type="button" className="btn btn-secondary">Manage
                            users
                        </button>
                        <button type="button" className="btn btn-secondary">Solve</button>
                        <button type="button" className="btn btn-secondary"
                                onClick={() => this.props.editHandler(this.props.entry.id)}>Edit
                        </button>
                        <button type="button" className="btn btn-secondary"
                                onClick={() => this.props.removeHandler(this.props.id)}>Remove
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}