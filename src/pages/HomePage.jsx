/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom"
// import BgImg from "../assets/images/toys-airs-bg.jpg"
import SingleShowRoomCard from "../components/SingleShowRoomCard"
import HomeHeadCard from "../components/HomeHeadCard"
import DarkCardContainer from "../components/DarkCardContainer"


const HomePage = () => {

  const moveLeft = () => {
    console.log('left')
  }

  const moveRight = () => {
    console.log('right')
  }
  


  return (
    <>
     
      <section className="section">
         <HomeHeadCard /> 
         <DarkCardContainer conatinerTitle={'Driving Vision'} />

         <div className="project-show-gallery-container p-3 py-10 w-full">
            <h1 className="text-3xl font-semibold">Project Show Room</h1>
                  
         </div>
       
      </section>

    </>
  )
}

export default HomePage