import { createBrowserRouter } from "react-router";
import React from "react";
import App from "./App";
import Login from "../src/pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";




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
            element : <Navbar/>
        }
       ]
    }
])

export default appRouter;

