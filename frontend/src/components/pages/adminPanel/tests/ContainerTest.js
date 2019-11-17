import React from 'react';

export class ContainerTest extends React.Component {
    state={
        description:null
    };
    componentDidMount() {
        this.setState({description: this.props.entry.description});
    }
    onDescriptionChange(e){
        this.setState({description: e.target.value});
        this.props.changeHandler(this.props.id,e.target.value);
    }
    render() {
        return(
            <tr>
                <th scope="row">{this.props.entry.id}</th>
                <td><input type="text" className="form-control" id="testDescription" value={this.state.description}
                           onChange={this.onDescriptionChange.bind(this)}/></td>
                <td className="text-right">
                    <div className="btn-group ">
                        <button id="manageUsersButton" type="button" className="btn btn-secondary">Manage
                            users
                        </button>
                        <button id="solveButton" type="button" className="btn btn-secondary">Solve</button>
                        <button id="editButton" type="button" className="btn btn-secondary" onClick={()=>this.props.editHandler(this.props.entry.id)}>Edit</button>
                        <button id="removeButton" type="button" className="btn btn-secondary" onClick={()=>this.props.removeHandler(this.props.id)}>Remove
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}