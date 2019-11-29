import React from 'react';

export class HeaderQuestions extends React.Component {
    render() {
        return (
            <tr>
                <th scope="col">#</th>
                <th scope="col" className="w-75">Question text</th>
                <th scope="col" className="col-2">Type</th>
                <th scope="col" className="text-right">
                    <div className="btn-group ">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => this.props.addHandler()}>Add question
                        </button>
                        <button type="button" className="btn btn-secondary"
                                onClick={() => this.props.returnHandler()}>Return
                        </button>
                    </div>

                </th>
            </tr>
        )
    }
}