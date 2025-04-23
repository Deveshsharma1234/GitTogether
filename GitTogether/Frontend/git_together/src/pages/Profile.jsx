import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const user = useSelector(state => state.user.user);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-950 to-indigo-900 flex items-center justify-center p-4">
        <div className="card glass shadow-xl w-full max-w-5xl text-white">
            <div className="card-body">
                <h2 className="card-title text-2xl text-purple-50 font-black justify-center">Your Profile</h2>
    
                <div className="flex flex-col md:flex-row md:justify-evenly items-center gap-8 mt-6">
                    <div className="space-y-2 text-center md:text-left">
                        <p><span className="font-bold text-purple-200">First Name:</span> {user.firstName}</p>
                        <p><span className="font-bold text-purple-200">Last Name:</span> {user.lastName}</p>
                        <p><span className="font-bold text-purple-200">Email:</span> {user.email}</p>
                        <p><span className="font-bold text-purple-200">Age:</span> {user.age}</p>
                        <p><span className="font-bold text-purple-200">Gender:</span> {user.gender}</p>
                        <p><span className="font-bold text-purple-200">Description:</span> {user.disc}</p>
                        <p><span className="font-bold text-purple-200">Skills:</span> {user.skils}</p>
                    </div>
    
                    <img className='rounded-4xl w-48 md:w-60 shadow-2xl' src={user.photoUrl} alt="Profile" />
                </div>
    
                <div className="card-actions justify-center mt-6">
                    <Link to="/editProfile" className="btn btn-primary btn-wide">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default Profile;
