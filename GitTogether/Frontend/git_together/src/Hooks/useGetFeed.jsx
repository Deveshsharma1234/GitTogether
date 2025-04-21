
import { useEffect, useState } from 'react';
import { BASE_URL } from '../Utils/constants';

const UseGetFeed = () => {
    const [feed,setFeed] = useState([]);
    console.log( "from usegetFeed state variable" , feed)
      useEffect(()=>{
            const getFeed = async()=>{
                try {
                    const res =  await fetch(BASE_URL+"/user/feed",{
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }
        
                    })
                    if (res.status === 401) {
                        // Clear localStorage and reload
                        localStorage.removeItem("user");
                        window.location.reload();
                        return;
                    }
                    const data = await res.json();
                    console.log(data);
                    setFeed(data.user)
                    
                } catch (error) {
                    console.log(error);
                    //it is to clear user from local storage
                    // if(error.status === 401){
                    //     localStorage.removeItem("user");
                    //     window.location.reload();
                    // }
                    
                }
            }
            getFeed();
        
        },[])
        return feed;
    }


export default UseGetFeed;
