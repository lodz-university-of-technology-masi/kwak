import React from 'react';
import {CheckAnswer} from "./CheckAnswer";

export class AnswerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.responses,
        };

        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    onSelectionChange(id, value) {
        let newSelected;

        if (value) {
            newSelected = [...this.state.selected, id];
        } else {
            newSelected = this.state.selected.filter(function(item) {
                return item !== id
            });
        }

        this.setState({ selected: newSelected });
        this.props.onUpdate(newSelected);
    }

    render() {
        return (
            <div>
                {this.props.entries.map((item, index) => (
                    <CheckAnswer key={index}
                                 id={index}
                                 content={item.content}
                                 checked={this.state.selected.includes(index)}
                                 onChange={(id, isChecked) => this.onSelectionChange(id, isChecked)}
                    />
                ))}
            </div>
        );
    }
}