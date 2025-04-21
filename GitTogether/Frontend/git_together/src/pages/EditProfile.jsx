import React, { useState } from 'react';

import { useRef } from 'react';

import { ToastContainer } from 'react-toastify';

import { useSelector } from 'react-redux';
import UseUpdatePofile from '../Hooks/useUpdatePofile';

const EditProfile = () => {
    
    const [loading, setLoading] = useState(false);


    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const discriptionRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();
    const skillsRef = useRef();
    const user = useSelector(store => store.user.user)
    

   const handleUpdate = UseUpdatePofile(firstNameRef,lastNameRef,emailRef,discriptionRef,ageRef,genderRef,skillsRef);
//    handleUpdate(loading,setLoading);

    return (
        <>
            <ToastContainer />
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4 bg-base-100 bg-gradient-to-l"
            // style={{ backgroundImage: `url(${earthImg})` }}
            >
                <div className='bg-opacity-10 backdrop-blur-3xl shadow-lg w-full max-w-md sm:max-w-sm md:max-w-lg lg:max-w-md xl:max-w-md flex flex-col items-center  rounded-2xl glass '>
                    <h2 className='text-left text-xl sm:text-2xl font-semibold text-purple-400 mt-4'>Edit Your Profile</h2>

                    <form onSubmit={(e) => e.preventDefault()} className='text-white w-full px-6 sm:px-8 md:px-10 py-4 sm:py-6 space-y-4'>

                        <div className="flex flex-col">
                            <label className="font-semibold">First Name :</label>
                            <input defaultValue={user.firstName} ref={firstNameRef} type="text" placeholder='First name..' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Last Name :</label>
                            <input defaultValue={user.lastName} ref={lastNameRef} type="text" placeholder='Last name..' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Email :</label>
                            <input defaultValue={user.email} ref={emailRef} type="email" placeholder='Email' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">discription :</label>
                            <input defaultValue={user.disc} ref={discriptionRef} type="text" placeholder='Discription' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Age :</label>
                            <input defaultValue={user.age} ref={ageRef} type="number" placeholder='Age' className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Gender :</label>
                            <select defaultValue={user.gender} ref={genderRef} className='w-full h-10 px-4 py-2 rounded-lg bg-purple-400 bg-opacity-50 text-white'>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold">Skills :</label>
                            <input
                                defaultValue={user.skils}
                                ref={skillsRef}
                                type="text"
                                name="skils"
                                placeholder="Enter skills (comma-separated)"
                                className="px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="flex  items-center justify-center gap-3   ">
                            <input
                            onClick={()=>{
                                handleUpdate(loading,setLoading);
                            }}
                                type="button"
                                name="Update"
                                value="Update"
                                disabled={loading}

                                className='bg-purple-500 hover:bg-purple-600 transition-all duration-200 text-white font-semibold px-6 py-2 rounded-2xl cursor-pointer'
                            />
                        </div>

                    </form>
                </div>






            </div>


        </>
    );
}

export default EditProfile;
