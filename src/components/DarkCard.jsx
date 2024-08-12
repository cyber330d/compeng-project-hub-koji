/* eslint-disable react/prop-types */

const DarkCard = ({headText, bodyText}) => {
  return (
    <>
      <div className="bg-gray-100 h-40 rounded p-2 ">
         <h1 className="font-mono text-gray-800 text-2xl h-10">{headText}</h1>
         <p className="text-sm text-gray-700 font-roboto">{bodyText}</p>
      </div>
    </>
  )
}

export default DarkCard