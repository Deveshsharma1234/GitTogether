import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { removeConnectionsRequest } from "../Redux/Slice/connectionSlice"
import { BASE_URL } from "../Utils/constants";
const useReviewReq =()=>{
const dispatch = useDispatch();
    return async(status,id)=>{
        try {
            const res = await fetch( BASE_URL+`/request/review/${status}/${id}`,{
                method:  "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials : "include"    
            })
            const data = await res.json();
            if(data.err !== undefined){
                toast.error(data.err,{
                    position:'top-right',
                    theme: "light"
                })

            }else{
                toast.success(data.message,{
                    position:'top-right',
                    theme: "light",
                    autoClose:3000,
                    hideProgressBar:false,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,

                })
                dispatch(removeConnectionsRequest(id));

            }
            
        } catch (error) {
            toast.error(error,{
                position:'top-right',
                theme: "light"
            })
        }

    }
}

export default useReviewReq