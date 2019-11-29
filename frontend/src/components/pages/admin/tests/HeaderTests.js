import React from 'react';

export class HeaderTests extends React.Component {
    render() {
        return(
            <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-right">
                    <button type="button" className="btn btn-secondary" onClick={()=>this.props.addHandler()}>Add test</button>
                </th>
            </tr>
        )
    }
}