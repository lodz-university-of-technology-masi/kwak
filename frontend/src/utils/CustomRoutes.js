import React from "react";
import {ImportTest} from "../components/pages/admin/ImportTest";
import {Route} from "react-router-dom";

export const customRoutes = [
    <Route exact path="/tests/import" component={ImportTest} />
]