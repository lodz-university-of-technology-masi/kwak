import React from 'react';

export class TestRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        const {test, onTestEdit, onTestRemove} = this.props;
        const {loading} = this.state;
        return (
            <tr>
                <th scope="row">{test.id}</th>
                <td>
                    {test.title}
                </td>
                <td className="text-right">
                    <div className="btn-group ">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => onTestEdit(test)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-secondary"
                                onClick={() => {
                                    this.setState({loading: true});
                                    onTestRemove(test);
                                }}>
                            Remove {loading && <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}