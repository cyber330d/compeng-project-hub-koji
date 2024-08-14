import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { API_BASE_URL } from "../assets/Proxy"

const SinglePersonalProject = () => {
   const navigate = useNavigate()
   const { id } = useParams()
   const [project, setProject] = useState(null)

   useEffect(() => {
      axios.get(`${API_BASE_URL}/api/single-project/${id}`)
      .then((response) => {
         console.log(response.data.project)
         setProject(response.data.project)
      })
      .then((error) => {
         console.log(error)
      })
      .finally(() => {

      })
   },[])

   const deleteProject = (project_id) => {
      const confirm = window.confirm('Confirm Delete')
      if(confirm){
         axios.post(`${API_BASE_URL}/api/delete-project/${parseInt(project_id)}`)
         .then((response) => {
            navigate('/my-project')
            console.log(response.data.status)
            // if(response.data.status === true){
               
            // }
         })
         .then((error) => {
            console.log(error)
         })
      }
      
    };


  return (
    <>
      <NavBar />
      <div className="single-project-container w-full mt-2">
         { project ? (         
            <div className="w-11/12 md:w-10/12 lg:w-6/12 m-auto shadow">
            <div className="">
               <img src={project.project_img_url} alt="" className="max-h-96 w-full object-contain hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="px-3">
               {/* <span className="text-sm text-gray-500">Project Title</span>  */}
               <p className="text-2xl font-bold">
                {project.project_title}
               </p>
            </div> 
            <div className="p-3">
              
               <span className="text-sm text-gray-500">Summary</span> 
               <p className="roboto text-sm text-gray-900">
               {project.project_summary}
               </p>
               <span className="text-sm text-gray-500">Vision</span> 
               <p className="roboto text-sm text-gray-900">
                 {project.project_vision}
               </p>
            </div> 
            {/*  */}
            <div className="p-3">
               <span className="text-sm text-gray-500 ">Author</span> 
               
               <p className="roboto text-sm mt-1 font-semibold text-gray-900 bg-gray-100 p-1">
                  {project.author}
               </p>
            </div>
            <div className="mt-2 p-3 flex gap-2">
            <NavLink to={`/edit-project/${project.project_id}`}>
               <button className="bg-gray-100 text-black border border-gray-900 p-1.5 hover:bg-gray-200 px-5 m-2 font-semibold h-12 rounded">Edit</button>
            </NavLink>

            <button onClick={() => deleteProject(project.project_id)} className="bg-gray-100 text-black border border-pink-500 p-1.5 hover:bg-gray-200 px-5 m-2 font-semibold h-12 rounded">Delete</button>
            </div>
         </div>) : 'Loading . . .'}

      </div>
    </>
  )
}

export default SinglePersonalProject