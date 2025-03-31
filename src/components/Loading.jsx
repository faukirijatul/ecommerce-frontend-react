import React from 'react'
import { ImSpinner } from "react-icons/im";

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full bg-gray-100'>
      <ImSpinner className='animate-spin text-5xl text-gray-800' />
    </div>
  )
}

export default Loading