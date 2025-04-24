import {toast} from 'react-toastify'
import {BASE_URL} from '../Utils/constants'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../Redux/Slice/feedSlice'
const useHandleRequest =()=>{
    const feed = useSelector(store => store.feed)
    const dispath = useDispatch();
    const navigate = useNavigate();

  


    return  async(status, toUserId)=>{
        try {
            const res = await fetch(BASE_URL +`/request/send/${status}/${toUserId}`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if(data.err !== undefined){
                toast(data.err,{
                    position:"top-right",
                    theme:"light",
                    autoClose:3000,
                    hideProgressBar:false,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                    
                })
                

            }else{
                toast("Request sent successfully "+ data.message,{
                    position:"top-right",
                    theme:"light",
                    autoClose:3000,
                    hideProgressBar:false,
                    closeOnClick:true,
                    pauseOnHover:true,
                    draggable:true,
                    icon:true
    
                  
                })

                dispath(removeFeed(toUserId))
                // setTimeout(() => {
                //   location.reload();
                // }, 3000);
           
            }

            
        } catch (error) {
            toast(error,{
                position:"top-right",
                theme:"dark",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                progress:undefined,
            })

            
        }


    }

}

export default useHandleRequest