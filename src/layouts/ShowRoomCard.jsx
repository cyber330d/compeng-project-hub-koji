/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatDate, shortenText } from "../assets/Proxy"

const ShowRoomCard = ({ project }) => {
  return (
    <>
       <div className="card w-full mt-2 rounded-t-2xl bg-gray-50 hover:bg-gray-50 hover:shadow w-full h-96 border border-gray-50">
          <div className="">
            <img src={project.project_img_url} alt="" className="h-56 w-full object-cover p-1 rounded-2xl" />
          </div>          
          <div className="h-36 borderr bg-gray-1000">
              <div className="flex items-center justify-between px-2 mt-1">
                <p className="text-xs flex items-center gap-2 grotesk font-semibold text-gray-800">
                  <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  </span>
                  {project.author}
                </p>
                <span className="tiny-font bg-gray-100 px-1">{project.category}</span>
              </div>
              <div className="px-2 mt-2"> 
                <p className="font-bold text-2xl grotesk">{project.project_title}</p>
                <span className="text-base">{shortenText(project.project_summary)}</span>
                {/* <p className=" self-end"> {formatDate(project.created_at)}</p> */}
              </div>
          </div>
      </div>
    </>
  )
}

export default ShowRoomCard