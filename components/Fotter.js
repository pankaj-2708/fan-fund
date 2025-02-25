import React from 'react'

const Fotter = () => {
  const date = new Date();
    const year = date.getFullYear();
  return (
    <div className='p-2 h-15 flex items-center justify-center bg-gray-900 text-white text-center sm:px-0 px-4'>
      <p>
      Copyright &copy; {year} Get me a Chai - All rights Reserved
       </p>
    </div>
  )
}

export default Fotter