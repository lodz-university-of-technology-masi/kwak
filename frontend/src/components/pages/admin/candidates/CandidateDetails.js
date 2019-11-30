import React, {Component} from "react";
import {API} from "aws-amplify";

export default class CandidateDetails extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            candidateTests: [],
            loading: false
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        this.setState({
            loading: true
        });

        const {match: {params: {candidateId}}} = this.props;
        const candidateTests = await API.get('kwakApi', `/candidates/${candidateId}/tests`, {});
        if (this._isMounted) {
            this.setState({
                candidateTests,
                loading: false
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {candidateTests, loading} = this.state;
        return (
            <div>
                {loading && <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
                <h2>Assigned tests</h2>
                {candidateTests.map(candidateTest => (
                    <div key={candidateTest.testId}>
                        <h2>Test Id: {candidateTest.testId}</h2>
                    </div>
                ))}
            </div>
        );
    }
}