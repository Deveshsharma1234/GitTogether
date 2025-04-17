import React from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../Utils/constants';



const login =async (emailRef,passwordRef,navigate)=>{

       try {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        let loggedInUser = await fetch(BASE_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                email,
                password
            })




        })
     loggedInUser  =   await loggedInUser.json()
    if(loggedInUser.error === undefined){
        console.log(loggedInUser)
        console.log(loggedInUser?.user?.firstName)
        navigate("/home")
    }else{
        toast.error(loggedInUser.error,{
            theme: "dark"

        })
    }
        
     } catch (error) {
        console.log(error)
        toast.error(error.message,{
            theme: "dark"

        })
        
     }
}

export default login