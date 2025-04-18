import { createBrowserRouter } from "react-router";
import React from "react";
import App from "./App";
import Login from "../src/pages/Login";
import Register from "./pages/Register";




const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
       children : [
        {
            index : true,
            element : <Login/>
        },
        {
            path : "/register",
            element: <Register/>
        },
        {
            path : "/home",
            element : <h1>Home</h1>
        }
       ]
    }
])

export default appRouter;

