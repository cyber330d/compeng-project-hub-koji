import NavBar from "../components/NavBar"
import { NavLink } from "react-router-dom"
import { useState, useEffect,useContext } from "react"
import { API_BASE_URL } from "../assets/Proxy"
import { UserContext } from "../context/UsersContext"
import FakeSpinner from "../components/FakeSpinner"
import axios from "axios"
import HeadText from "../components/HeadText"
import ShowRoomCard from "../layouts/ShowRoomCard"


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
      <div className="container w-full mx-1 mt-2">
         <div className="body w-11/12 md:w-8/12 m-auto">
            <div className="border p-2 rouned">
              <HeadText text={'Groups'} />
            </div>
            {loading && <FakeSpinner />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
              { groups.length > 0 && groups.map((project, index) => (
                <NavLink key={index} to={`/single-group/${project.project_id}`}>
                  <ShowRoomCard project={project} />
                </NavLink>
              ))} 
            </div>
           
         
         </div>
      </div> 
    </>
  )
}

export default GroupPage