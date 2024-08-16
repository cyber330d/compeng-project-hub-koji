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


  // Clear Search Project
  const clearSearchProjects = () => {
    setSearchProjects([])
    setKeyword('')
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
        <div className="p-2">
          <div className="flex items-center">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search projects..."
              className="p-2 border rounded-l-md border-gray-300 focus:outline-none focus:border-indigo-500 w-full"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600"
            >
              Search
            </button>
          </div>
        
        </div>
          <div>
             {searchProjects.length > 0 ? 
             <button onClick={clearSearchProjects} className="hover:text-red-500 text-gray-600 border p-0.5 text-xs flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

              clear search
              </button>: ''}
          </div>
          {searchProjects.length > 0 ? searchProjects.map((project, index) => (
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
          )) : projectList.length > 0 ? projectList.map((project, index) => (
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
