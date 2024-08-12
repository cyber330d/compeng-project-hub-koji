import NavBar from "../components/NavBar"
import { NavLink } from "react-router-dom"
import { useState, useEffect,useContext } from "react"
import { API_BASE_URL } from "../assets/Proxy"
import { UserContext } from "../context/UsersContext"
import FakeSpinner from "../components/FakeSpinner"
import axios from "axios"


const GroupPage = () => {
  const token = localStorage.getItem('collab_token')
  const { user, getUser, loading } = useContext(UserContext)
  const [groups, setGroups] = useState([])


  useEffect(() => {
    if(token){
      if(!user){
        getUser()
      }
    }
  }, [])

  useEffect(() => {
    const getMyGroups = () => {
      axios.get(`${API_BASE_URL}/api/group-project/${user && user.user_id}`)
      .then((response) => {
        console.log(response.data)
        setGroups(response.data.groups)
      })
      .catch((error) => {
        console.log(error.response.data.message)
      })
      .then(() => {

      })
    }

    if(user !== null){
      getMyGroups()
    }

  }, [user])

  return (
    <>
      <NavBar />
      {loading && <FakeSpinner />}
      <div className="container w-full mx-1 mt-2">
         <p className="font-mono font-bold text-lg border rounded-full p-1 px-2 w-11/12 m-auto">Groups Project</p>
         <div className="body w-11/12 md:w-8/12 m-auto">
            { groups.length > 0 && groups.map((project, index) => (
               <NavLink key={index} to={`/single-group/${project.project_id}`}>
               <div  className="card w-full border mt-2 p-2 rounded bg-gray-100 hover:bg-gray-50 hover:shadow">
                  <span className="rounded-full bg-gray-300 p-0.5 text-green-500 text-xs font-semibold px-3 w-">{project.category}</span>
                  <div className="project-title text-lg font-bold">{project.project_title}</div>
                
               </div>
            </NavLink>
            ))}
         
         </div>
      </div> 
    </>
  )
}

export default GroupPage