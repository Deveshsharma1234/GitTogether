import { Outlet } from "react-router"
import Navbar from "./components/Navbar"

import { useSelector } from "react-redux"
import Footer from "./components/Footer";


function App() {
 const isLoggedIn = useSelector(store => store.user?.isLoggedIn);


  return (
    <>
   <div className="">
   { isLoggedIn&&<Navbar/>}
    <Outlet/>
     {isLoggedIn&&<Footer/>}
   </div>
    </>
  )
}

export default App
