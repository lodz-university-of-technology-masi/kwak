import React from 'react';
import Amplify from 'aws-amplify';
import Home from "./components/pages/Home";
import "./test.css";
import {BrowserRouter as Router} from "react-router-dom";

Amplify.configure({
    Auth: {
        identityPoolId: 'eu-central-1:d8667c34-8b20-4412-bb1b-b07038ec560b',
        region: 'eu-central-1',
        userPoolId: 'eu-central-1_9wfYARgNE',
        userPoolWebClientId: '1t63ut13jsadhsis8smjj3euek',
        mandatorySignIn: true,
    },
    API: {
        region: 'eu-central-1',
        endpoints: [
            {
                name: "kwakApi",
                endpoint: "https://ahysbf0ask.execute-api.eu-central-1.amazonaws.com/dev",
            }
        ]
    }
});

export default function App() {
    return (
        <Router>
            <div style={{width: '100%'}}>
                <Home/>
            </div>
        </Router>
    );
}
