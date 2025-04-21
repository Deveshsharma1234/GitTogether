
import { toast } from 'react-toastify';
import { removeUser } from '../Redux/Slice/userSlice';
import { BASE_URL } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useLogout =  ()=>{
    const dispatch = useDispatch();
  const navigate = useNavigate();
    return async()=>{
        const res = await fetch(BASE_URL + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"

    })



    const data = await res.json();
    console.log("navbar data for logout" + res.message);
    if (data.ok) {
        dispatch(removeUser());
      toast.success("Logout Successfully", {
        position: "top-right",
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

      })
      setTimeout(() => {


        navigate("/")
      }, 2000);
    }else{
      toast.error("Something went wrong",{
        position: "top-right",
        theme: "dark",


      })
    }
    }
}


export default useLogout