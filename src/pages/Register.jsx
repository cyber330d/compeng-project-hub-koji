/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { NavLink, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../assets/Proxy'
import { UserContext } from '../context/UsersContext'
import MiniIcon from "../assets/images/mini-icon.png"
import ErrorAlert from '../components/ErrorAlert'
import SuccessAlert from '../components/SuccessAlert'


const Register = () => {
  const navigate = useNavigate()
  const { registerUser, loading, user, login } = useContext(UserContext)

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)


  const [formData, setFormData] = useState({
    profileImg: null,
    name: '',
    email: '',
    phone:'',
    level:'Undergraduate',
    password: '',
    reg_number: '',
    password_confirmation: '',
    check: false
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const submitForm = (e) => {
    e.preventDefault()

    if(formData.name === ''){
      showErrorAlert('Fill in your name')
    }

    if(formData.email === ''){
      showErrorAlert('Fill in your email')
    }
    if(formData.reg_number === ''){
      showErrorAlert('Fill in your reg number')
    }
    
    if(formData.phone === ''){
      showErrorAlert('Fill in your phone number')
    }

    if(formData.password !== formData.password_confirmation){
      showErrorAlert('Password do not match')
    }
 
    const regist = registerUser(formData)

    console.log(regist)
    
  }

  useEffect(() => {
    if(login === true){
      navigate('/showroom')
    }
  }, [login])
  
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
      { successAlert === true ? <SuccessAlert message={message} />  : '' }
      {/*  */}
      { errorAlert &&  <ErrorAlert message={message} /> }
      {/*  */}
      <div className="auth-container w-full">
          <div className="auth-body shadow border rounded w-80 m-auto mt-10">
          <div className="flex items-center justify-center gap-2 p-2">
            <img src={MiniIcon} alt="" />
            <p className="font-bold text-lg grotesk">Sign Up</p>
          </div>
              <div className="w-full">
                <form onSubmit={submitForm} className='w-full p-3'>
                  <div className="mt-2">
                    <input name='name' className='w-full p-2 rounded border' type="text" placeholder='Enter Name' onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                    <input name='email' className='w-full p-2 rounded border' type="text" placeholder='Enter Email' onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                    <input name='reg_number' className='w-full p-2 rounded border' type="text" placeholder='Enter Registration Number' onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                    <input className='w-full p-2 rounded border' type="number" name='phone' placeholder='Phone' onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                    <select name="level" id="" className='w-full p-2 border rounded' onChange={handleInputChange} value={formData.level}>
                      <option value="Undergraduate">Undergraduate</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <input className='w-full p-2 rounded border' type="text" name='password' placeholder='Password' onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                    <input className='w-full p-2 rounded border' type="text" name='password_confirmation' placeholder='Confirm Password' onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                  <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gray-900 text-white p-1.5 hover:bg-gray-950 font-semibold h-10 rounded">
                    { loading && <div className="">please wait...</div> } 
                    { loading &&  <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>}
                  
                    { !loading && <div className="">Register</div>}
                    </button>
                    <div className='mt-2 flex items-center gap-1 hidden'>
                      <input type="checkbox" name='check' className='' onChange={handleInputChange}/>
                      <p className='text-xs gray-500'>Agree to all our terms and conditions withoout seeing it ??</p>
                    </div>
                  </div>
                  <p>
                  <NavLink to='/login' className='mt-2 text-sm underline text-emerald-500'>
                      I have an account 
                  </NavLink>
                </p>
                </form>
              </div>
          </div>
      </div>

    </>
  )
}

export default Register