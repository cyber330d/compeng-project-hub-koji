import NavBar from "../components/NavBar"
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, formatDate } from "../assets/Proxy";
import { UserContext } from "../context/UsersContext";
import HeadText from "../components/HeadText";
import FakeSpinner from "../components/FakeSpinner"
import Footer from "../components/Footer";

const MyProfile = () => {

  const { user, getUser } = useContext(UserContext)
  const navigate = useNavigate()
  const token = localStorage.getItem('collab_token')

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    if(token){
      getUser()
    }

  },[])
  return (
    <>
      <NavBar />
      
      <div className="body w-11/12 mt-10 md:w-8/12 m-auto">
         <div className="border p-2 flex justify-between">
            <NavLink to='/my-project' className="flex items-center shadow text-sm p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
              </svg>
              <span className=''>back</span>
            </NavLink>
        </div>
        <div className="border p-2">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            {user &&  <HeadText style={'white'} text={user && user.name}/>}
            
          </div>
           <p className="border-t p-2">{user && user.email}</p>
           <p className="border-t p-2">{user && user.reg_number}</p>
           <p className="border-t p-2">{user && user.phone}</p>
           <p className="border-t p-2">{user && user.level}</p>
           <div className="border-t p-2"></div>
           <button className="p-2 bg-gray-900 text-white text-sm rounded" disabled>Update Profile</button>
         </div>
        </div>
    </>
  )
}

export default MyProfile