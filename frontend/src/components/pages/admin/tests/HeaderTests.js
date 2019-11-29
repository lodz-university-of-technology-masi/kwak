import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    withRouter
} from "react-router-dom";

class HeaderTests extends React.Component {
    render() {
        const {match} = this.props;
        return (
            <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-right">
                    <Link to={`${match.url}/add`}><button className="btn btn-secondary">Add test</button></Link>
                </th>
            </tr>
        )
    }
}

export default withRouter(HeaderTests);