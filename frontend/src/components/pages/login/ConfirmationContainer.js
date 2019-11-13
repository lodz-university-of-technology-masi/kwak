import React from 'react';

export class ConfirmationContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-group needs-validation col-12 col-sm-10 col-md-7 col-lg-5 hidden" noValidate>
                <div>
                    <label htmlFor="confirmationCode">Confirmation code</label>
                    <input type="text" className="form-control mb-2" id="confirmationCode" name="confirmationCode"
                           placeholder="123 456" required/>
                </div>
                <button id="confirmationButton" type="button" className="btn btn-primary col-5">
                    <span>Confirm</span>
                    <div className="spinner spinner-border spinner-border-sm hidden" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </button>
            </form>
        );
    }
}