import React from 'react';
import earthImg from "../assets/earth.png"
import { Link, useNavigate,  } from 'react-router';

import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import useLogin from '../Hooks/useLogin';
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()
    const localStorageEmail = localStorage.getItem("email");
    const localStoragePassword = localStorage.getItem("password");

  

    const handleLogin = async () => {
        useLogin(emailRef,passwordRef,navigate);
    }
    

    return (
    <>
    <ToastContainer/>
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: `url(${earthImg})` }}
        >
            <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl w-full max-w-md sm:max-w-sm md:max-w-lg lg:max-w-md xl:max-w-md flex flex-col items-center text-white rounded-2xl">

                {/* Top Image */}
                <div className="w-full">
                    <img
                        src={earthImg}
                        alt="Top Banner"
                        className="w-full h-1/2 object-cover rounded-t-2xl"
                    />
                </div>


                {/* Login Form */}
                <div className="w-full flex flex-col gap-4 px-6 sm:px-8 md:px-10 py-4 sm:py-6">
                    <h2 className="text-left text-xl sm:text-2xl font-semibold text-purple-400">Login</h2>

                    <input
                    defaultValue={localStorageEmail}
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                    defaultValue={localStoragePassword}
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 bg-opacity-50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition duration-300"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <h3 className="text-black text-center text-sm sm:text-base">
                        New? <Link to="/register" className="text-purple-500 hover:underline">Register here</Link>
                    </h3>
                </div>
            </div>
        </div>
        
    </>

    );
}

export default Login;
