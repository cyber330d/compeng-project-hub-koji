/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom"
// import BgImg from "../assets/images/toys-airs-bg.jpg"
import SingleShowRoomCard from "../components/SingleShowRoomCard"
import HomeHeadCard from "../components/HomeHeadCard"
import DarkCardContainer from "../components/DarkCardContainer"
import Footer from "../components/Footer"


const HomePage = () => {

  const token = localStorage.getItem('collab_token')

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
         <Footer />
      </section>

    </>
  )
}

export default HomePage