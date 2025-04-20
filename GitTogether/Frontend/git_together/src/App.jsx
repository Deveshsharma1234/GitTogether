import { Outlet } from "react-router"
import Navbar from "./components/Navbar"

import { useSelector } from "react-redux"
import Footer from "./components/Footer";


function App() {
 const isLoggedIn = useSelector(store => store.user?.isLoggedIn);


  return (
    <>
   { isLoggedIn&&<Navbar/>}
    <Outlet/>
     {isLoggedIn&&<Footer/>}
    </>
  )
}

export default App
