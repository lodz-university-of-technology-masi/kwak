import React from 'react';
import {ContainerTest} from ".././tests/ContainerTest";
import {HeaderTests} from ".././tests/HeaderTests";
import {getAllTests} from "../../../../utils/api";

export class PanelTests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
        };
    }

    componentDidMount() {
        this.setState({tests: getAllTests()});
    }

    removeHandler(index) {
        let newTests = [...this.state.tests];
        newTests.splice(index, 1);
        this.setState({tests: newTests});
    }

    addHandler() {
        let newTests = [...this.state.tests];
        newTests.push({"id": this.state.tests.length.toString(), "description": "", "language": "PL"});
        this.setState({tests: newTests});
    }

    editHandler(index) {
        this.props.history.push({
            pathname: '/questions',
            search: '?testId=' + index,
            state: {testId: index}
        });
    }

    changeDescriptionHandler(index, newDescription) {
        let newTests = [...this.state.tests];
        newTests[index].description = newDescription;
        this.setState({tests: newTests});
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <HeaderTests addHandler={this.addHandler.bind(this)}/>
                    </thead>
                    <tbody>
                        {this.state.tests.map((item, index) => {
                            return <ContainerTest key={index} id={index} entry={item}
                                                  removeHandler={this.removeHandler.bind(this)}
                                                  changeHandler={this.changeDescriptionHandler.bind(this)}
                                                  editHandler={this.editHandler.bind(this)}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
