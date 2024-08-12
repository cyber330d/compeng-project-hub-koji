/* eslint-disable no-unused-vars */
import { NavLink, useNavigate, useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useState, useEffect, useContext } from "react"
import { API_BASE_URL } from "../assets/Proxy"
import axios from "axios"
import { UserContext } from '../context/UsersContext';
import FakeSpinner from '../components/FakeSpinner'
import MiniSpinner from "../components/MiniSpinner"


const SingleGroup = () => {
   const token = localStorage.getItem('collab_token')
   const navigate = useNavigate()

   const { user, getUser } = useContext(UserContext)

   const [project, setProject] = useState(null)
   const [people, setPeople] = useState([])
   const [proposal, setProposal] = useState([])
   const [proposalList, setProposalList] = useState([])
   const [btLoading, setBtLoading] = useState(false)
   const { id } = useParams()

   useEffect(() => {
      if(token){
         if(user === null){
            getUser()
         }
      }

   }, [])


   useEffect(() => {

      const getGroupInfo = () => {
         axios.get(`${API_BASE_URL}/api/group-info/${id}`)
         .then((response) => {
            console.log(response.data)
         })
         .catch((error) => {
            console.log(error.response.data.message)
         })
      }

      const getProposals = () => {
         axios.get(`${API_BASE_URL}/api/get-proposals/${id}`)
         .then((response) => {
            console.log(response.data)
            setProposalList(response.data.proposals)
         })
         .catch((error) => {
            console.log(error.response.data.message)
         })
      }

      getProposals()
      getGroupInfo()
      getProject()
   }, [])


   // #Initails formState
   const [formData, setFormData] = useState({
      proposal: '',
      project_id: parseInt(id),

   });

   // 
   // Handle form data for change and update state
   const handleInput = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value})
   }
   // - - - - - -  - - 

   // Get the proposal data Asap hahahahah
   const getProject = () => {
      axios.get(`${API_BASE_URL}/api/single-project/${id}`)
      .then((response) => {
         // console.log(response.data)
        setProject(response.data.project);

      })
      .catch((error) => {
        console.log(error);
      });
   }

   // Handles proposal post section in details
   const submitProposal = (e) => {
      e.preventDefault()
      const data = {
         ...formData,
         'name': user && user.name,
         'user_id': user && user.user_id,
      }

      if(formData.proposal === ''){
         return alert('Can not submit empty proposal')
      }

      const postProposalData = (data) => {
         axios.post(`${API_BASE_URL}/api/post-proposal`, data)
         .then((response) => {
            console.log(response.data.proposals)
            setProposalList(response.data.proposals)
            alert('Proposal Submited')
         })
         .catch((error) => {
            console.log(error.response.data.message)
            alert('An error occured:try again')
         })
      }

      postProposalData(data)
   }

   function formatDate(laravelDate) {
      const date = new Date(laravelDate);
      
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${month}/${day}/${year}`;
  }

  const deleteProposal = (proposal_id) => {
   const data = {
      proposal_id,
      user_id: user && user.user_id,
      project_id: project && project.project_id
   }
      axios.post(`${API_BASE_URL}/api/delete-proposal`, data)
      .then((response) => {
         console.log(response.data)
         setProposalList(response.data.proposals)
      })
      .catch((error) => {
         console.log(error.response.data.message)
      })
  }

  const exitGroup = () => {
   const data = {
      user_id: user && user.user_id,
      project_id: project && project.project_id
   }
      axios.post(`${API_BASE_URL}/api/exit-group`, data)
      .then((response) => {
         console.log(response.data)
         navigate('/groups')
      })
      .catch((error) => {
         console.log(error.response.data.message)
      })
  }

  return (
    <>
      <NavBar />
      {}
      <div className="single-project-container w-full mt-2">
      {/* <span className="bg-gray-200 text-black p-2 ml-2 m-1">back</span> */}
         {project ? (
            <>
               <div className="w-11/12 md:w-10/12 lg:w-6/12 m-auto shadow">
                  <div className="px-3">
                     <span className="text-sm text-gray-500 hidden">Project Title</span> 
                     <p className="text-xl font-bold py-1">
                        {project.project_title}
                     </p>
                  </div> 
               </div>
               <div className="p-3 mt-2 w-11/12 md:w-10/12 lg:w-6/12 m-auto border border-gray-100 rounded">
               { (project && project.user_id) !== (user && user.user_id) &&  <button onClick={exitGroup} className="text-red-500 mt-2 cursor-pointer text-sm font-mono border p-1 rouned-full hover:bg-gray-200">exit group</button>}
              
                  <div className="">
                     <span className="p-1 rounded-full text-xs bg-gray-800 text-gray-100 hidden">Members :</span>
                     <div className="flex gap-3 flex-wrap mt-2 text-xs md:text-sm md:font-semibold">
                        <span className="p-1 bg-gray-100 text-gray-900 hover:bg-gray-200">Erasmus</span>
                        <span className="p-1 bg-gray-100 text-gray-900 hover:bg-gray-200">Samaila</span>
                     </div>
                     
                  </div>
                  <div className="mt-2 hidden">
                   <span className="p-1 rounded-full text-xs bg-gray-800 text-gray-100">Propose Topic :</span>
                   <p className="bg-gray-100 p-2 mt-2 font-semibold">Development of Micro chips with new chips</p>  
                  </div>
               </div>
               {/*  */}
               <div className="p-3 mt-2 w-11/12 md:w-10/12 lg:w-6/12 m-auto border border-gray-100 rounded">
                  <form onSubmit={submitProposal}>
                     <label htmlFor="" className="block text-sm font-semibold my-1 hidden">Input your suggested proposal</label>
                     <input onChange={handleInput} name="proposal" type="text" placeholder="Enter Proposition" className="border border-orange-300 rouned p-3 w-full"/>
                     <button className="flex items-center border rounded mt-2 font-semibold px-5 p-2 border bg-gray-200 hover:bg-gray-400">
                        {btLoading ? <MiniSpinner /> : 'post proposal'}
                     </button>
                  </form>
               </div>
               {/*  */}
               {/* Proposal Card */}
               <div className="p-3 mt-2 w-11/12 md:w-10/12 lg:w-6/12 m-auto shadow border rounded">
                  {proposalList.length > 0 && (
                     proposalList.map((proposal, index) => (
                        <div key={index} className="mt-2 bg-gray-900 p-2 rounded">
                           <div className="p-1 rounded-full text-xs text-gray-400 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                                 <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                              </svg>
                              <span>{proposal.name}</span>
                              <span className="border-l-2 pl-2">{formatDate(proposal.created_at)}</span>
                           </div>
                           <p className="bg-gray-800 text-gray-200 p-2 mt-2 font-semibold">{proposal.proposal}</p>  
                           {(proposal && proposal.user_id) === (user && user.user_id) && <button onClick={() => deleteProposal(proposal.proposal_id)} className="text-xs mt-2 bg-gray-950 rounded-full px-2 font-mono text-red-500 p-1">
                              delete

                           </button>}
                        </div>
                     ))
                  )}
               </div>
               {/*  */}
            </>
         ) : <FakeSpinner /> }
      </div>
    </>
  )
}

export default SingleGroup