/* eslint-disable no-unused-vars */
import NavBar from "../components/NavBar";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../assets/Proxy";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    projectImage: null,
    projectTitle: '',
    projectSummary: '',
    projectVision: '',
    author: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, isLoading] = useState()


  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/single-project/${id}`)
      .then((response) => {
        const { project_image, project_title, project_summary, project_vision, author } = response.data.project;
        setProject(response.data.project);
        setFormData({
          projectImage: project_image,
          projectTitle: project_title,
          projectSummary: project_summary,
          projectVision: project_vision,
          author: author
        });
        setImagePreview(project_image); // Set initial image preview
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'projectImage' && files && files[0]) {
      setImagePreview(URL.createObjectURL(files[0])); // Set image preview
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const submitUpdated = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('project_title', formData.projectTitle);
    data.append('project_summary', formData.projectSummary);
    data.append('project_vision', formData.projectVision);
    data.append('author', formData.author);
    data.append('user_id', project.user_id);
    data.append('project_id', parseInt(project.project_id));
    
    if (formData.projectImage !== project.project_image) {
      data.append('project_image', formData.projectImage);
    }

    axios.post(`${API_BASE_URL}/api/update-project`, data)
      .then((response) => {
        console.log(response.data);
        alert('Project updated successfully');
      })
      .catch((error) => {
        console.log(error);
        alert('There was an error updating the project');
      });
  };

  return (
    <>
      <NavBar />
      <div className="mx-1 mt-10 mb-20">
        <div className="bg-gray-100 w-full w-11/12 md:w-8/12 m-auto">
          <h1 className="font-bold p-3 text-lg text-gray-700">Edit Project</h1>
          <div className="new-project-body">
            {project ? (
              <form onSubmit={submitUpdated}>
                 <div className="">
                     <img src={project.project_img_url} alt="" className="max-h-96 w-full object-contain transition-transform duration-300" />
                  </div>
                <div className="m-2 border">
                  {/* <label htmlFor="projectImage" className="text-gray-500 p-1 font-bold text-sm block">
                    Project Image/ Description Image
                  </label>
                  {imagePreview && <img src={imagePreview} alt="project description" className="h-24 rounded border m-2 bg-gray-200" />}
                  <input type="file" name="projectImage" id="projectImage" onChange={handleInputChange} /> */}
                </div>
                <div className="m-2 border p-1">
                  <label htmlFor="projectTitle" className="text-gray-500 p-2 font-bold text-sm block">
                    Project Title
                  </label>
                  <textarea name="projectTitle" id="projectTitle" className="w-full p-2 h-16 font-semibold" placeholder="Correctly state your project title" value={formData.projectTitle} onChange={handleInputChange}></textarea>
                </div>
                <div className="m-2 border p-1">
                  <label htmlFor="projectSummary" className="text-gray-500 p-1 font-bold text-sm block">
                    Project Summary
                  </label>
                  <textarea name="projectSummary" id="projectSummary" className="w-full h-20 p-2 text-sm" placeholder="Correctly state your project summary" value={formData.projectSummary} onChange={handleInputChange}></textarea>
                </div>
                <div className="m-2 border p-1">
                  <label htmlFor="projectVision" className="text-gray-500 p-1 font-bold text-sm block">
                    Vision
                  </label>
                  <textarea name="projectVision" id="projectVision" className="w-full h-20 p-2 text-sm" placeholder="Correctly state your project vision" value={formData.projectVision} onChange={handleInputChange}></textarea>
                </div>
                <div className="m-2 border p-1">
                  <label htmlFor="author" className="text-gray-500 p-1 font-bold text-sm block">
                    Author
                  </label>
                  <input type="text" name="author" id="author" className="w-full p-3 rounded" value={formData.author} onChange={handleInputChange} />
                </div>
               <div className="flex items-center gap-3">
                 <button className="bg-gray-900 text-white p-1.5 hover:bg-gray-950 px-5 m-2 font-semibold h-14 rounded">Submit Update</button>
                 <NavLink to='/my-project'>
                  <button className="bg-gray-100 text-black border border-gray-900 p-1.5 hover:bg-gray-200 px-5 m-2 font-semibold h-12 rounded">Cancle</button>
                </NavLink>
               </div>
              </form>
            ) : 'Loading . . .' }
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
