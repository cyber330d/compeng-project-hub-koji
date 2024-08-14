/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useState, useEffect, useContext } from "react"
import { API_BASE_URL } from "../assets/Proxy"
import axios from "axios"
import { UserContext } from '../context/UsersContext';
import FakeSpinner from '../components/FakeSpinner'
import HeadText from "../components/HeadText"


const MyProject = () => {


   const navigate = useNavigate()
   const { user, getUser } = useContext(UserContext)
   const token = localStorage.getItem('collab_token')
   const [loading, setLoading] = useState(true)
 
   useEffect(() => {
     if(!token){
       navigate('/login')
     }
     if(token){
       getUser()
     }
 
   },[])
 
   useEffect(() => {
      if(user){
         getMyProject()
      }
   }, [user])

   const [projectList, setProjectList] = useState([])

   const getMyProject = () => {
      
      axios.get(`${API_BASE_URL}/api/myprojects/${user.user_id}}`)
      .then(response => {
         console.log(response.data);
         setProjectList(response.data.projects)
      })
      .then(error => {
         console.error('There was an error!', error);
      })
      .finally(() => {
         setLoading(false)
      })
   }

   function formatDate(laravelDate) {
      const date = new Date(laravelDate);
      
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${month}/${day}/${year}`;
  }


  return (
    <>
      <NavBar />
      {loading && <FakeSpinner />}
      <div className="container w-full mx-1 mt-2">
         <HeadText text={'My Project'}/>
         <div className="body w-11/12 md:w-8/12 m-auto">
            { projectList.length > 0 && projectList.map((project, index) => (
               <NavLink key={index} to={`/my-project/${project.project_id}`}>
               <div  className="card w-full border mt-2 p-2 rounded bg-gray-100 hover:bg-gray-50 hover:shadow">
                  <span className="rounded-full bg-gray-300 p-0.5 text-green-500 text-xs font-semibold px-3 w-">{project.category}</span>
                  <div className="project-title text-lg font-bold">{project.project_title}</div>
                  <div className="info mt-2 bg-gray-50 p-2 w-5/12">
                     <p className="text-xs font-bold text-gray-500">{project.author}</p>
                     <p className="text-xs mt-0.5">{formatDate(project.created_at)}</p>
                  </div>
               </div>
            </NavLink>
            ))}
         
         </div>
      </div> 

    </>
  )
}

export default MyProject