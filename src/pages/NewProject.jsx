/* eslint-disable react/no-unknown-property */
import { useState, useEffect,useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBar from "../components/NavBar";
import axios from 'axios';
import { API_BASE_URL, handleAxiosError } from '../assets/Proxy';
import { UserContext } from '../context/UsersContext';

const NewProject = () => {
  const navigate = useNavigate()
  const { user, getUser } = useContext(UserContext)
  const token = localStorage.getItem('collab_token')

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    if(token){
      getUser()
    }

  },[])
  useEffect(() => {
  }, [user])

  const [formData, setFormData] = useState({
    projectImage: null,
    projectTitle: '',
    projectSummary: '',
    vision: '',
    authors: '',
    category: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, projectImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('project_image', formData.projectImage);
    data.append('project_title', formData.projectTitle);
    data.append('project_summary', formData.projectSummary);
    data.append('project_vision', formData.vision);
    data.append('author', formData.authors);
    data.append('category', formData.category);
    data.append('user_id', user && user.user_id);
    
    data.forEach((element, index) => {
      console.log(element + ':' + index)
    });

    if (data.project_title === '') {
      return showErrorAlert('Project Title is required');
    }
  
    if (data.project_summary === '') {
      return showErrorAlert('Project Summary is required');
    }
  
    if (data.authors === '') {
      return showErrorAlert('Authors field is required');
    }
  
    if (data.vision === '') {
      return showErrorAlert('Vision field is required');
    }

    if (data.category === '') {
      return showErrorAlert('Category field is required');
    }

    try {
      setLoading(true)
      const response = await axios.post(`${API_BASE_URL}/api/create-project`, data);
      console.log(response.data);
      showSuccessAlert(response.data.message)
      setLoading(false)
      // Handle success (e.g., navigate to another page or show a success message)
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      console.log(errorMessage);
      showErrorAlert(errorMessage)
      console.log('There was an error creating the project!', error);
      // Handle error (e.g., show an error message)
      setLoading(false)
    }
  };

  const showSuccessAlert = (message) => {
    setMessage(message)
    setSuccessAlert(true)
    setTimeout(() => {
      setSuccessAlert(false)
    }, 3000)
  }
  const showErrorAlert = (message) => {
    setMessage(message)
    setErrorAlert(true)
    setTimeout(() => {
      setErrorAlert(false)
    }, 3000)
  }

  return (
    <>
      <NavBar />
      {/*  */}
      { successAlert === true ? <div className="Success-Alert bg-blue-800 w-full md:w-8/12 m-auto shadow border rounded flex items-center gap-2 my-2 p-2 text-white fixed top-0 left-1/2 transform -translate-x-1/2 mt-4">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
            </svg>
          </span>
          <p className='font-semibold'>{message}</p>
        </div>  : '' }
      {/*  */}
      { errorAlert &&  <div className="Error Alert bg-pink-800 w-full md:w-8/12 m-auto shadow border rounded flex items-center gap-2 my-2 p-2 fixed top-0 left-1/2 transform -translate-x-1/2 mt-4">
          <span className=''>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
          </svg>
          </span>
          <p className='font-semibold'>{message}</p>
      </div> }
      {/*  */}
      {/*  */}
      <div className="mx-2 mt-2 mb-20">
        <div className="bg-white w-full md:w-8/12 m-auto shadow border rounded">
          <h1 className="font-bold p-3 text-lg text-gray-700">Create New Project</h1>
          <div className="new-project-body w-full">
            <form onSubmit={handleSubmit}>
              <div className="m-2 shadow p-2">
                <label className="text-gray-500 font-bold text-sm block">Project Image/ Description Image</label>
                { imagePreview &&  <img src={imagePreview} alt="project description" className="object-contain h-96 w-auto rounded border bg-gray-200"/>}  
                <input type="file" name="projectImage" onChange={handleImageChange} className='mt-2'/>
              </div>
              <div className="m-2 p-1">
                <label className="text-gray-500 p-1 font-bold text-sm block">Project Title</label>
                <textarea name="projectTitle" className="p-1 w-full border" placeholder="Correctly state your project title" onChange={handleInputChange}></textarea>
              </div>
              <div className="m-2 p-1">
                <label className="text-gray-500 p-1 font-bold text-sm block">Project Summary</label>
                <textarea name="projectSummary" className="p-1 w-full border" placeholder="Correctly state your project Summary" onChange={handleInputChange}></textarea>
              </div>
              <div className="m-2 p-1">
                <label className="text-gray-500 p-1 font-bold text-sm block">Vision</label>
                <textarea name="vision" className="p-1 w-full border" placeholder="Correctly state your project Vision" onChange={handleInputChange}></textarea>
              </div>
              <div className="m-2 p-1">
                <label className="text-gray-500 p-1 font-bold text-sm block">Project Category</label>
                <select 
                  name="category" 
                  className="p-1 w-full border bg-gray-800 text-white rounded" 
                  placeholder="Correctly state your project Vision" 
                  onChange={handleInputChange}
                  value={formData.category} // Ensure the select input is controlled
                >
                  <option value="">Select</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Networking">Networking</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Robotics">Robotics</option>
                </select>
              </div>

              <div className="m-2 p-1">
                <label className="text-gray-500 p-1 font-bold text-sm block">Authors</label>
                <input type="text" name="authors" className="w-full p-3 rounded border" onChange={handleInputChange} />
              </div>
              <div className="flex items-center">
                <button disabled={loading} className="flex items-center gap-2 bg-gray-900 text-white p-1.5 hover:bg-gray-950 px-5 m-2 font-semibold h-12 rounded">
                { loading && <div className="">Creating...</div> } 
                { loading &&   <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>}
               
                 { !loading && <div className="">Create Project</div>}
                </button>
                <NavLink to='/my-project'>
                  <button className="bg-gray-100 text-black border border-gray-900 p-1.5 hover:bg-gray-200 px-5 m-2 font-semibold h-12 rounded">Cancle</button>

                </NavLink>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProject;
