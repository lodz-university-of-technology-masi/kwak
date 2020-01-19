import React from 'react';
import Skeleton from "@material-ui/lab/Skeleton";

export class QuestionCounter extends React.Component {
    render() {
        return (
            <>
                {!this.props.loading ? (
                    <small>Pytanie
                        {this.props.current}/{this.props.total}
                    </small>
                ) : (
                    <Skeleton variant="text"/>
                )}
            </>
        )
    }
}