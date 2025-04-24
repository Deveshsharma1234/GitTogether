import {BASE_URL} from '../Utils/constants'
import {toast} from 'react-toastify'
import { useState } from 'react'
const useGetFriends = ()=>{



    return async ()=>{
        try {
            
            const res = await fetch(BASE_URL+"/user/connections",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials : "include"
            })
            const data = await res.json();
            if(data.err !== undefined){
                toast.error(data.errr,{
                    position: "top-center",
                    theme: "colored"

                })
            }else{
               return data;
                
            }


        } catch (error) {
            toast.error(error,{
                position: "top-center",
                theme: "colored"
            })
            
            
        }


        
        


    }
}
export default useGetFriends;