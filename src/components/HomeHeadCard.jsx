import { NavLink } from "react-router-dom"

const HomeHeadCard = () => {
  return (
    <div>
              <div className="header-card mx-1 mt-1 p-3 bg-green-50 rounded-t">
            <div className="flex items-center justify-between">
                <div></div>
                <ul className="inner flex gap-2 text-white text-sm items-center">
                  <NavLink to='/register'>
                    <li className="bg-gray-100 p-1 rounded-full px-3 border border-gray-900 hover:bg-gray-200 text-gray-900 flex items-center gap-2 font-bold">
                      Sponsor <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    </span>
                    </li>
                  </NavLink>
                  <NavLink to='/register'>
                    <li className="bg-gray-950 p-1 rounded-full px-3 border border-gray-900 hover:bg-gray-800">
                      Join Us  
                    </li>
                  </NavLink>
                  <NavLink to='/login'>
                    <li className="bg-gray-950 p-1 rounded-full px-2 border border-gray-900 hover:bg-gray-800">Sign-In</li>
                  </NavLink>                  
                </ul>
            </div>
            <div className="inner my-14">
              <p className="text-green-600 space-mono text-2xl text-center font-bold mt-5">Ahmadu Bello University</p>

              <p className="text-3xl uppercase text-center md:text-5xl lg:text-5xl font-extrabold leading-relaxed font-mono text-white">Computer Engineering Project<br/> Gallery and Collaboration <br/>platform</p>  
            </div>
            
         </div>

    </div>
  )
}

export default HomeHeadCard
