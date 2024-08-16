/* eslint-disable no-unused-vars */
import NavBar from "../components/NavBar"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL } from "../assets/Proxy"
import AbuPng from '../assets/images/abu.png'
import { UserContext } from "../context/UsersContext"
import FakeSpinner from "../components/FakeSpinner"
import Footer from "../components/Footer"
import MiniSpinner from "../components/MiniSpinner"


const SingleProject = () => {

   const { user, getUser } = useContext(UserContext)
   const token = localStorage.getItem('collab_token')
   const navigate = useNavigate()
   const { id } = useParams()
   const [project, setProject] = useState(null)
   const [loading, setLoading] = useState(true)
   const [member, setMember] = useState(false)
   const [confirm, setConfirm] = useState(false)
   const [btnLoading, setBtLoading] = useState(true)


   useEffect(() => {
      if(token){
         console.log(token)
         if(user === null){
            getUser()
         }  
      }else {
         console.log('no token token')
      }



      axios.get(`${API_BASE_URL}/api/single-project/${id}`)
      .then((response) => {
         setProject(response.data.project)
      })
      .then((error) => {
         console.log(error)
      })
      .finally(() => {
         setLoading(false)
      })

   }, [])


   useEffect(() => {
      const data = {
         user_id: user && user.user_id,
         project_id: project && project.project_id
      } 

      const confirmIfMember = () => {
         axios.post(`${API_BASE_URL}/api/check-membership`, data)
         .then((response) => {
               setConfirm(true)
               if(response.data.member === true){
                  setMember(true)
                  console.log('member')
               }else if(response.data.member === false){
                  setMember(false)
                  console.log('not member')
               }
         })
      }
      confirmIfMember()

   }, [project, user])

   useEffect(() => {
      setBtLoading(false)
   }, [member])
   

   const joinProject = () => {

      const confirmRe = window.confirm('Are you sure you want to join')

      if(confirmRe){
         console.log(user.user_id)
         const data = {
            ...user,
            project_id : project.project_id,
            status: true,
            rank: 'member'
         }
         setConfirm(false)
         axios.post(`${API_BASE_URL}/api/join-project`, data)
         .then((response) => {
            console.log(response.data)
            if(response.data.member === true){
               setMember(true)
               setConfirm(true)
            }
         })
         .catch((error) => {
            console.log(error.response.data.message)
         })
         .finally(() => {
            setLoading(false)
            setConfirm(true)
         }) 
      }
   }

  return (
   <>
      <NavBar />
      <div className="single-project-container w-full mt-2">
      {/* <span className="bg-gray-200 text-black p-2 ml-2 m-1">back</span> */}
         {project ? (<div className="w-11/12 md:w-10/12 lg:w-6/12 m-auto shadow">
            <div className="border p-2 flex justify-between">
               <NavLink to='/showroom' className="flex items-center shadow text-sm p-1">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
               <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
               </svg>
               <span className=''>back</span>
               </NavLink>
            </div>
              <div className="px-3">
                 {/* <img className="w-28" src={AbuPng} alt="" /> */}
                 <div className="">
                     <img src={project.project_img_url} alt="" className="max-h-96 w-full object-contain transition-transform duration-300" />
                  </div>
                 <span className="text-sm text-gray-500">Project Title</span> 
                 <p className="text-2xl font-bold">
                  {project.project_title}
                  </p>
               </div> 
              <div className="p-3">
                 <span className="text-sm text-gray-500">Vision</span> 
                 <p className="roboto text-sm text-gray-900">
                  {project.project_vision}
                  </p>
                 <span className="text-sm text-gray-500">Summary</span> 
                 <p className="roboto text-sm text-gray-900">
                  {project.project_summary}
                 </p>
               </div> 
               {/*  */}
               <div className="p-3">
                  <span className="text-sm text-gray-500 ">Contributors</span> 
                  <p className="roboto text-sm font-semibold text-gray-900 bg-gray-100 p-1">
                   {project.author}
                  </p>
               </div>
               <div className="mt-2 p-3 flex gap-2">
                  <p>{ !confirm ? <MiniSpinner /> : member ? <span className="border p-1 bg-gray-100 font-semibold">Member</span> : <button onClick={joinProject} className="bg-gray-100 hover:bg-gray-200 flex items-center gap-1 p-1 text-sm rounded">
                     Join Project <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                     </svg>
                     </span>
                  </button>}</p>
                  
                  <button className="bg-gray-100 hover:bg-gray-200 flex items-center gap-1 p-1 text-sm rounded hidden">
                     Save <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                     </svg>
                     </span>
                  </button>
                
               </div>
         </div>) : <FakeSpinner /> }
         
      </div>
      <Footer />
   </>

)
}

export default SingleProject