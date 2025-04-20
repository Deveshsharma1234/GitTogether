import React from 'react';
import earthImg from '../assets/earth.png'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import useRegister from '../Hooks/useRegister';
import { ToastContainer } from 'react-toastify';
import {Link, useNavigate} from 'react-router'
const Register = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();
    const skillsRef = useRef();
    const navigate = useNavigate();
    const register = useRegister();

    const handleRegister = async ()=>{
    
        const res =  await register(firstNameRef,lastNameRef,emailRef,passwordRef,ageRef,genderRef,skillsRef);
        if(res?.success ===true){
            toast.success("Registered successfully!", {
                theme: "dark",
                position: "top-right",
            });
            setTimeout(() => {
                navigate('/');
            }, 2000);

        }else{
            console.error("Registration failed:", res?.error);
            toast.error("Registration failed!", {
                theme: "dark",
                position: "top-right",
            });
        }


    }



    return (
        <>
        <ToastContainer/>
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4 glass"
                style={{ backgroundImage: `url(${earthImg})` }}
            >
             <div className='bg-opacity-10 backdrop-blur-3xl shadow-lg w-full max-w-md sm:max-w-sm md:max-w-lg lg:max-w-md xl:max-w-md flex flex-col items-center text-white rounded-2xl'>
  <h2 className='text-left text-xl sm:text-2xl font-semibold text-purple-400 mt-4'>Registeration</h2>
  
  <form onSubmit={(e) => e.preventDefault()} className='text-white w-full px-6 sm:px-8 md:px-10 py-4 sm:py-6 space-y-4'>

    <div className="flex flex-col">
      <label className="font-semibold">First Name :</label>
      <input ref={firstNameRef} type="text" placeholder='First name..' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
    </div>

    <div className="flex flex-col">
      <label className="font-semibold">Last Name :</label>
      <input ref={lastNameRef} type="text" placeholder='Last name..' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
    </div>

    <div className="flex flex-col">
      <label className="font-semibold">Email :</label>
      <input ref={emailRef} type="email" placeholder='Email' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
    </div>

    <div className="flex flex-col">
      <label className="font-semibold">Password :</label>
      <input ref={passwordRef} type="password" placeholder='Password..' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
    </div>

    <div className="flex flex-col">
      <label className="font-semibold">Age :</label>
      <input ref={ageRef} type="number" placeholder='Age' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
    </div>

    <div className="flex flex-col">
      <label className="font-semibold">Gender :</label>
      <select ref={genderRef} className='w-full h-10 px-4 py-2 rounded-lg bg-purple-400 bg-opacity-50 text-white'>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label className="font-semibold">Skills :</label>
      <input
        ref={skillsRef}
        type="text"
        name="skils"
        placeholder="Enter skills (comma-separated)"
        className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
      />
    </div>

    <div className="flex  items-center justify-center gap-3   ">
      <input
        type="button"
        name="Register"
        value="Register"
        onClick={handleRegister}
        className='bg-purple-500 hover:bg-purple-600 transition-all duration-200 text-white font-semibold px-6 py-2 rounded-2xl cursor-pointer'
      />
      <h3 className="text-black text-center text-sm sm:text-base">Already a user? <Link to={'/'}  className="text-purple-500 hover:underline">Singn in</Link></h3>
    </div>

  </form>
</div>






            </div>


        </>
    );
}

export default Register;
