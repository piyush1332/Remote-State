import React , { useState, Suspense } from "react";
import { Redirect , Switch , Route } from "react-router-dom";
import Dashboard from "./Dashboard";

function DashboardRoutes() {
    return (
        <>
            <Switch>
                <Route to="/dashboard" >
                    <Dashboard />
                </Route>
            </Switch>
        </>
    );
}

export default DashboardRoutes;