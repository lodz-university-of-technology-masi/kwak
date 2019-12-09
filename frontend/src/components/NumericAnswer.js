import React from 'react';

export class NumericAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.props.onUpdate(e.target.value);
    }

    render() {
        return (
            <div className="list-group-item list-group-item-action">
                <input type="number" className="form-control" name="content" value={this.state.content}
                          onChange={this.handleChange}/>
            </div>
        );
    }
}