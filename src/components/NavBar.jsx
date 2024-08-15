/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UsersContext"
import { useContext, useEffect, useState } from "react"

const NavBar = () => {

   const { user, loading, logOutUser, login } = useContext(UserContext)
   const navigate = useNavigate()

   const token = localStorage.getItem('collab_token')

   const logOut = () => {
      console.log('Logout')
      logOutUser()

      navigate('/')
   }


  return (
    <>
      <div className="navigation-bar bg-gradient-to-r from-gray-950 to-gray-800 mx-1 h-16 rounded mt-1 content-center">
         <div className="flex items-center justify-between mx-5">
            <ul className="flex items-center gap-3">
               {token ? ( <>
                <NavLink to='/showroom' >
                  <li className="bg-gray-100 p-1 rounded-full gap-1 flex text-sm items-center hover:bg-gray-900 hover:text-gray-50 font-mono">
                     <span className="hidden md:flex font-semibold ml-1">Home</span>
                     <span className="bg-gray-950 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                     </svg>
                     </span> 
                  </li>
               </NavLink>
               <NavLink to='/my-project'>
                  <li className="bg-gray-900 text-white p-1 rounded-full gap-1 flex text-sm items-center hover:bg-gray-950 hover:text-gray-50">
                     <span className="hidden md:flex font-semibold ml-1">My Project</span>
                     <span className="bg-gray-950 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                     <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clip-rule="evenodd" />
                     <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
                     </svg>

                     </span> 
                  </li>
               </NavLink>
               <NavLink to='/groups'>
                  <li className="bg-gray-900 text-white p-1 rounded-full gap-1 flex text-sm items-center hover:bg-gray-950 hover:text-gray-50">
                     <span className="hidden md:flex font-semibold ml-1">Groups</span>
                     <span className="bg-gray-950 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                     <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                     </svg>
                     </span> 
                  </li>
               </NavLink>
               <NavLink className='hidden' to='/saved'>
                  <li className="bg-gray-900 text-white p-1 rounded-full gap-1 flex text-sm items-center hover:bg-gray-950 hover:text-gray-50">
                     <span className="hidden md:flex font-semibold ml-1">Saved</span>
                     <span className="bg-gray-950 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                     <path fill-rule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z" clip-rule="evenodd" />
                     </svg>

                     </span> 
                  </li>
               </NavLink>
               <NavLink to='/myprofile'>
                  <li className="bg-gray-900 text-white p-1 rounded-full gap-1 flex text-sm items-center hover:bg-gray-950 hover:text-gray-50">
                     <span className="hidden md:flex font-semibold ml-1">Profile</span>
                     <span className="bg-gray-950 text-white rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                     <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                     </svg>

                     </span> 
                  </li>
               </NavLink>
             </>) : <>
               <NavLink to='/'>
                  <li className="bg-gray-200 p-1 text-sm text-black rounded-full px-3 border border-gray-900 hover:bg-gray-400">
                     Banner  
                  </li>
               </NavLink>
               <NavLink to='/register'>
                  <li className="bg-gray-950 p-1 text-sm text-white rounded-full px-3 border border-gray-900 hover:bg-gray-800">
                     Join Us  
                  </li>
               </NavLink>
               <NavLink to='/login'>
                  <li className="bg-gray-950 p-1 text-sm text-white rounded-full px-2 border border-gray-900 hover:bg-gray-800">Sign-In</li>
               </NavLink>   
             </>}
             
            </ul>

            <ul className="flex items-center">
               {token && <button onClick={logOut} className="text-red-700 font-mono bg-gray-900 rounded-full p-1 px-1.5 flex items-center gap-1 items-center text-sm hover:bg-gray-950">
                  <span className="hidden md:flex font-semibold ml-1">Logout</span>
                  <span className="bg-gray-50 rounded-full p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
                  </svg>

                  </span>
               </button>}
               
               
            </ul>
         </div>
      </div> 

    </>
  )
}

export default NavBar