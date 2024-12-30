import React from 'react'

const Loading = () => {
  return (
    <div className='bg-stat-gradient bg-black flex-col flex gap-4 items-center justify-center w-full h-screen m-0 p-0'>
      <img src='/img/Spinner.gif' className='w-1/6 md:w-1/4 sm:w-1/2' alt="loading"/>
      <p className='text-4xl font-bold text-white md:text-2xl sm:text-xl'>Loading player data...</p>
    </div>
  )
}

export default Loading