import React from 'react';

export class CheckAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.checked,
        };

        this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange() {
        this.setState({
            isChecked: !this.state.isChecked,
        });

        this.props.onChange(this.props.id, !this.state.isChecked);
    }

    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action" onClick={this.toggleChange}>
                <div className="custom-control custom-checkbox float-left">
                    <input type="checkbox" className="custom-control-input" checked={this.state.isChecked}/>
                    <label className="custom-control-label"/>
                </div>

                <div id="content">{this.props.content}</div>
                <code id="code">{this.props.code}</code>
            </a>
        );
    }
}