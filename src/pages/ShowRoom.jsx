/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, formatDate } from "../assets/Proxy";
import { UserContext } from "../context/UsersContext";
import HeadText from "../components/HeadText";
import FakeSpinner from "../components/FakeSpinner"
import Footer from "../components/Footer";
import ShowRoomCard from "../layouts/ShowRoomCard";

import bgImage from '../assets/images/bg-1.jpeg';


const ShowRoom = () => {
  const navigate = useNavigate();
  const { user, getUser } = useContext(UserContext);
  const [projectList, setProjectList] = useState([]);
  const token = localStorage.getItem('collab_token');

  const [keyword, setKeyword] = useState('');
  const [searchProjects, setSearchProjects] = useState([]);

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

    if(projectList.length < 0 || projectList.length === 0){
       getProjects();
    }
   
  }, [user, setProjectList]);


  // Handles the search functions
  const handleSearch = async () => {
      if(keyword === '' || keyword === null){
        return false;
      }
      axios.get(`${API_BASE_URL}/api/projects/search`, {
        params: { keyword },
      })
      .then((response) => {
        console.log(response.data)
      
        setSearchProjects(response.data.projects);
      })
      .catch ((error) => {
        console.error('Error searching projects:', error);
      })
  };

  useEffect(() => {
    if(keyword === '' || !keyword){
      clearSearchProjects()
    }
  }, [keyword])


  // Clear Search Project
  const clearSearchProjects = () => {
    setSearchProjects([])
    setKeyword('')
  }

  return (
    <div>
      <NavBar />
      {/* Search Bar */}
      <div className="mt-1">
      </div>
      {/* Search Bar */}

      <div className="container w-11/12 m-auto mb-20">
        
        <div className="body w-full md:w-8/12 m-auto">
        <div className="">
          <div className="flex items-center">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search projects..."
              className="p-2 border rounded-l-md border-gray-300 focus:outline-none focus:border-indigo-900 w-full h-10"
            />
            <button
              onClick={handleSearch}
              className="p-2 h-10 bg-indigo-500 text-white rounded-r-full hover:bg-indigo-900 "
            >
              Search
            </button>
          </div>
        </div>
          <div className="mt-1 rounded">
             {searchProjects.length > 0 ? 
             <button onClick={clearSearchProjects} className="hover:text-red-500 text-gray-600 border rounded-full p-0.5 px-1 text-sm flex items-center">
              clear search
              </button>: ''}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center">
            {searchProjects.length > 0 ? searchProjects.map((project, index) => (
                <NavLink key={index} to={`/single-project/${project.project_id}`}>
                   <ShowRoomCard project={project} />
                </NavLink>
              )) : projectList.length > 0 ? projectList.map((project, index) => (
                <NavLink key={index} to={`/single-project/${project.project_id}`}>
                  <ShowRoomCard project={project} />
                </NavLink>
              )): <FakeSpinner />}

          </div>
        
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowRoom;
