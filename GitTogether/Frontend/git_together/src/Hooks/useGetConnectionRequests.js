import { useEffect } from "react"
import { BASE_URL } from "../Utils/constants"
import { toast } from "react-toastify"



const useGetConnectionRequests =()=>{

    return async ()=>{
        try {
            const res = await fetch(BASE_URL+"/user/requests",{
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const connections = await res.json();
            return connections;
            
        } catch (error) {
            toast(error,{
                theme: "dark",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }
            )

            
        }

    }
}
export default useGetConnectionRequests