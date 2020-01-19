import React from 'react';
import Skeleton from "@material-ui/lab/Skeleton";

export class Question extends React.Component {
    render() {
        return (
            <div className="question">
                <div id="title">
                    {!this.props.loading ? this.props.title : <Skeleton variant="text"/>}
                </div>

                <div id="description">
                    {!this.props.loading ? this.props.description : <Skeleton variant="text"/>}
                </div>

                <code id="code">
                    {!this.props.loading ? this.props.code : <Skeleton variant="text"/>}
                </code>
            </div>
        );
    }
}