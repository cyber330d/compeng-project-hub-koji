/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../assets/Proxy";
import { handleAxiosError } from "../assets/Proxy";


// create user context
export const UserContext = createContext()

// Create provider components
export const UserProvider = ({ children }) => {


   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState(null)
   const [errMsg, setErrMsg] = useState(null)
   const [login, setLogin] = useState(false)
   const [token, setToken] = useState(localStorage.getItem('collab_token'))

   const collab_token = localStorage.getItem('collab_token')

   const getUser = () => {
      setLoading(true)

      axios.get(`${API_BASE_URL}/api/user`, {
         headers: {
            'Authorization': `Bearer ${collab_token}`,
          },
      })
      .then((response) => {
         setUser(response.data)
         console.log(response.data)
      })
      .catch((error) => {
         console.log(error)
      })
      .finally(() => {
         setLoading(false)
      })
   }

   const registerUser = (formData) => {
      setLoading(true)
      axios.post(`${API_BASE_URL}/api/register`, formData)
      .then((response) => {
         if(response.data.status === true){
            console.log(response.data)
           setUser(response.data.user) 
           localStorage.setItem('collab_token', response.data.token)
           setLogin(true)
         }
      })
      .catch((error) => {
         const errorMessage = handleAxiosError(error);
         console.log(errorMessage);
      })
      .finally(() => {
         setLoading(false)
      })
   }

   const loginUser = (formData) => {
      setLoading(true)
      axios.post(`${API_BASE_URL}/api/login`,formData)
      .then((response) => {
         console.log(response)
         if(response.statusText === 'OK'){
           setLogin(true)
           setUser(response.data.user)
            localStorage.setItem('collab_token' ,response.data.token)
            setLogin(true)
         }
      })
      .catch((error) => {
         console.log(error.response.data.message)
         setErrMsg(error.response.data.message)
      })
      .finally(() => {
         setLoading(false)
      })
   }

   const logOutUser = () => {
      if(collab_token !== null){
         axios.post(`${API_BASE_URL}/api/logout`, {}, {
            headers:{
               'Authorization': `Bearer ${collab_token}`,
             },
         }) 
         .then((response) => {
            console.log(response.data)
            setLogin(false)
         })
         .catch((error) => {
            console.log(error.response.data.message)
         })
         .finally(() => {
            setLoading(false)
         })
         localStorage.removeItem('collab_token')
      }

   }

   return (
      <UserContext.Provider value={{
         user,
         loading,
         login,
         errMsg,
         token,
         setErrMsg,
         registerUser,
         getUser,
         loginUser,
         logOutUser

      }}>
         {children}

      </UserContext.Provider>
   );

};
