/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../assets/Proxy";
import { UserContext } from "../context/UsersContext";
import HeadText from "../components/HeadText";
import FakeSpinner from "../components/FakeSpinner"
import Footer from "../components/Footer";

const ShowRoom = () => {
  const navigate = useNavigate();
  const { user, getUser } = useContext(UserContext);
  const [projectList, setProjectList] = useState([]);
  const token = localStorage.getItem('collab_token');

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    if(token){
      getUser()
    }

  },[])

  useEffect(() => {
    const getProjects = () => {
      axios.get(`${API_BASE_URL}/api/projects`)
        .then(response => {
          console.log(response.data);
          setProjectList(response.data.projects);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    };

    getProjects();
  }, [user, setProjectList]);


    function formatDate(laravelDate) {
      const date = new Date(laravelDate);
      
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${month}/${day}/${year}`;
  }

  return (
    <>
      <NavBar />
      {/* Search Bar */}
      <div className="mt-1">
        

      </div>
      {/* Search Bar */}

      <div className="container w-11/12 m-auto mt-2 mb-20">
        
        <div className="body w-full md:w-8/12 m-auto">
        <div className="border p-2">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            {user &&  <HeadText style={'white'} text={user && user.name}/>}

          </div>
        
        </div>
          {projectList.length > 0 ? projectList.map((project, index) => (
            <NavLink key={index} to={`/single-project/${project.project_id}`}>
              <div className="card w-full border mt-2 p-2 rounded bg-gray-100 hover:bg-gray-50 hover:shadow">
                <span className="rounded-full bg-gray-300 p-0.5 text-green-500 text-xs font-semibold px-3">{project.category}</span>
                <div className="project-title text-lg font-bold">{project.project_title}</div>
                <div className="info mt-2 bg-gray-50 p-2 w-5/12">
                  <p className="text-xs font-bold text-gray-500">{project.author}</p>
                  <p className="text-xs mt-0.5">{formatDate(project.created_at)}</p>
                </div>
              </div>
            </NavLink>
          )): <FakeSpinner />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowRoom;
