import React from 'react';

export class ContainerTest extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { test, editHandler, removeHandler } = this.props;
        return (
            <tr>
                <th scope="row">{test.id}</th>
                <td>
                    {test.description}
                </td>
                <td className="text-right">
                    <div className="btn-group ">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => editHandler(test.id)}>Edit
                        </button>
                        <button type="button" className="btn btn-secondary"
                                onClick={() => removeHandler(test.id)}>Remove
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}