/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom"
// import BgImg from "../assets/images/toys-airs-bg.jpg"
import SingleShowRoomCard from "../components/SingleShowRoomCard"
import HomeHeadCard from "../components/HomeHeadCard"
import DarkCardContainer from "../components/DarkCardContainer"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_BASE_URL, formatDate } from "../assets/Proxy"
import HeadText from "../components/HeadText"
import FakeSpinner from "../components/FakeSpinner"

const HomePage = () => {

  const token = localStorage.getItem('collab_token')
  const [projects, setProjcts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const randomProject = () => { 
      axios.get(`${API_BASE_URL}/api/random-projects`)
      .then((response) => {
        console.log(response.data.project)
        setProjcts(response.data.projects)
      })
      .catch((error) => {
        console.log(error.response.data.message)
      }) 
    }

    randomProject()

  }, [])
  
  return (
    <>
     
      <section className="section">
         <HomeHeadCard /> 
         <DarkCardContainer conatinerTitle={'Driving Vision'} />
         {/*  */}
         
         <div className="body w-11/12 md:w-8/12 m-auto mb-10"> 
            <div className="">
               <div className="flex justify-between mt-3 items-center">
                   <HeadText text={'Some Projects'}/>
                  
               </div>
            </div>
            {loading && <FakeSpinner />}
            { projects.length > 0 && projects.map((project, index) => (
               <NavLink key={index} to={`/login`}>
               <div className="card w-full flex items-center gap-2 border mt-2 rounded bg-gray-50 hover:bg-gray-50 hover:shadow h-32">
                 <div className="p-1">
                  <img src={project.project_img_url} alt="" className="h-full rounded w-20 object-contain" />
                 </div>
                 <div className="border-l pl-2 border-gray-300 w-full">
                    <div className="project-title text-lg font-bold grotesk">{project.project_title}</div>
                  {/*  */}
                    <div className="info flex items-center justify-between mt-2 bg-gray-50">
                      <span className="rounded-full bg-gray-50 p-0.5 text-gray-800 text-xs text-cyan-500">{project.category}</span>
                      <div className="pr-1">
                        <p className="text-xs font-bold text-gray-500">{project.author}</p>
                        <p className="text-xs mt-0.5">{formatDate(project.created_at)}</p>
                      </div>
                      
                    </div>
                 </div>
                 
               </div>
            </NavLink>
            ))}
         
         </div>
         {/*  */}
         <Footer />
      </section>

    </>
  )
}

export default HomePage