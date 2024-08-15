/* eslint-disable react/prop-types */

const ErrorAlert = ({ message }) => {
  return (
    <>
      <div className="Error Alert bg-pink-800 w-10/12 md:w-8/12 m-auto rounded flex items-center gap-2 my-2 p-2 fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 text-sm text-gray-50">
          <span className=''>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          </span>
          <p className='font-semibold'>{message}</p>
      </div>
    </>
  )
}

export default ErrorAlert