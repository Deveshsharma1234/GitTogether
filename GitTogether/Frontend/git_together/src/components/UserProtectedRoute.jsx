import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router';


const UserProtectedRoute = ({Element}) => {
  
    const isLoggedIn = useSelector((store)=> store.user.isLoggedIn)
    console.log(isLoggedIn)
    if(!isLoggedIn){
    return <Navigate to={"/"}/>
    }
    else if(isLoggedIn && Element?.name === "Login"){
        
        return <Navigate to={"/home"}/>


    }
   else{
    return <Element/>
   }
}

export default UserProtectedRoute;
