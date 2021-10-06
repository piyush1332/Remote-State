import React from "react";
import { BrowserRouter } from "react-router-dom";
import DashboardRoutes from "./pages/dashboard/DashboardRoutes";

function Routes() {
    return (
        <>
            <BrowserRouter>
                <DashboardRoutes />
            </BrowserRouter>
        </>
    );
}

export default Routes;