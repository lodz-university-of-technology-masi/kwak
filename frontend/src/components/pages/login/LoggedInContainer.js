import React from 'react';

export class LoggedInContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="hidden">
                <h3>What's up? {this.props.name}</h3>
                <button id="logoutButton" className="btn btn-primary">Logout</button>
            </div>
        );
    }
}