import React from 'react';
import Amplify from 'aws-amplify';
import Home from "./components/pages/Home";
import "./test.css";
import {BrowserRouter as Router} from "react-router-dom";

Amplify.configure({
    Auth: {
        identityPoolId: 'eu-central-1:d8667c34-8b20-4412-bb1b-b07038ec560b',
        region: 'eu-central-1',
        userPoolId: 'eu-central-1_i1sBAxaQV',
        userPoolWebClientId: '35h96p1htsq9j9dfbjv62pudo1',
        mandatorySignIn: true,
    },
    API: {
        region: 'eu-central-1',
        endpoints: [
            {
                name: "kwakApi",
                endpoint: "https://gyglzn3bl8.execute-api.eu-central-1.amazonaws.com/dev",
            }
        ]
    }
});

export default function App() {
    return (
        <Router>
            <div className="container d-flex p-3 flex-column">
                <Home/>
            </div>
        </Router>
    );
}
