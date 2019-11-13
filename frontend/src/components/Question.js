import React from 'react';

export class Question extends React.Component {
    render() {
        return (
            <div className="question">
                <div id="title">
                    {this.props.title}
                </div>

                <div id="description">
                    {this.props.description}
                </div>

                <code id="code">
                    {this.props.code}
                </code>
            </div>
        );
    }
}