import React, {Component} from 'react';
import {withAuthenticator} from "aws-amplify-react";
import {Auth} from 'aws-amplify';
import AdminHome from "./admin/AdminHome";
import CandidateHome from "./candidate/CandidateHome";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false
        }
    }

    async componentDidMount() {
        const session = await Auth.currentSession();
        const groups = session.getIdToken().decodePayload()['cognito:groups'];
        this.setState({isAdmin: groups && groups.includes('Admin')})
    }

    render() {
        const {isAdmin} = this.state;
        if (isAdmin) {
            return <AdminHome/>;
        }

        return <CandidateHome/>;
    }
}


export default withAuthenticator(Home, false);