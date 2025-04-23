import { createBrowserRouter } from "react-router";
import React from "react";
import App from "./App";
import Login from "../src/pages/Login";
import Register from "./pages/Register";
import UserProtectedRoute from "../src/components/UserProtectedRoute"
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import FriendRequest from "./pages/FriendRequest";

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
            element : <UserProtectedRoute Element ={Home}/>
        },
        {
            path : "/profile",
            element : <UserProtectedRoute Element ={Profile}/>

        },
        {
            path :"/editProfile",
            element : <UserProtectedRoute Element ={EditProfile}/>
        },
        {
            path: "/friendRequest",
            element: <UserProtectedRoute Element ={FriendRequest}/>
        }
       ]
    }
])

export default appRouter;

