import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {  ToastContainer } from 'react-toastify';
import useLogout from '../Hooks/useLogout';
import Modal from './Modal';

const Navbar = () => {
  const user = useSelector(store => store.user?.user);

  const logout =useLogout();


  const handleLogout =  () => {
    logout();
  }

  console.log(user);
  return (

    <div className="navbar bg-neutral shadow-sm  px-10 sticky top-0 z-50 ">
      <ToastContainer />
      <div className="flex-1">
        <Link to={"/home"} className="btn btn-ghost text-xl">🔗GitTogether</Link>
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><Link onClick={handleLogout}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
