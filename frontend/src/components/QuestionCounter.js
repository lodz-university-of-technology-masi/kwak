import React from 'react';

export class QuestionCounter extends React.Component {
    render() {
        return (
            <small>Pytanie {this.props.current}/{this.props.total}</small>
        );
    }
}