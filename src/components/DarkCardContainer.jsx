/* eslint-disable react/prop-types */
import DarkCard from "./DarkCard"

const DarkCardContainer = ({ conatinerTitle }) => {
  return (
    <div>
      <div className="goals-vision-conatiner mx-1 p-3 shadow text-white start rounded-b">
            <h1 className="text-black text-3xl font-semibold mt-0 text-start">{conatinerTitle}</h1>
            <div className="grid md:grid-cols-2 my-10 gap-2 ">
              <DarkCard headText={'Display Students Projects'} bodyText={'Empowering students by showcasing their projects, fostering creativity, innovation, and collaboration, and inspiring future leaders to achieve their goals and contribute positively to society through a dedicated platform.'} />
              <DarkCard headText={'Cross Collaboration'} bodyText={'Empowering students by showcasing projects, fostering creativity, innovation, and cross-collaboration, inspiring future leaders to achieve their goals and contribute positively to society.'} />
              <DarkCard headText={'Continuation of Projects'} bodyText={'An oppurtunity for projects to be continually built upon by other students and staffs'} />
            </div>
         </div>
    </div>
  )
}

export default DarkCardContainer