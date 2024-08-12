
import DollarImg from "../assets/images/wallpaperflare-cropped.jpg"
import { NavLink } from "react-router-dom"


const SingleShowRoomCard = () => {
  return (
    <>
      <div className="project-show-gallery-card shadow border flex flex-col mx-2 w-96">
         <div className="project-card-image bg-gray-200 p-5">
            <img className="h-full rounded object-contain" src={DollarImg} alt="" />
         </div>
         <div className="project-card-description p-2">
         <p className="text-gray-900 text-2xl font-bold">Design of a dollar bill Puzzle
         </p>
         <p className="text-sm text-gray-700">
         Designing a dollar bill puzzle involves creating an engaging and educational experience that captures the intricate details of the currency. Each piece represents unique elements like historical figures, symbols, and security features, making it both fun and informative.
         
         </p>
         </div>         
         <div className="mt-5 flex justify-between items-center bg-gray-100 p-2">
            <div className="">
               <span className="text-xs">Author</span>
               <span className="block font-mono text-midium text-gray-600 font-bold">King Solomon</span>
            </div>
            <div className="">
               <NavLink to='single-project/234553'>
                  <button className="bg-gray-100 hover:bg-gray-200 border rounded p-1 px-3">View Project</button>
               </NavLink>
            </div>
         </div>
      </div>  
    </>
  )
}

export default SingleShowRoomCard