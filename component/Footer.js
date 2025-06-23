import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='bg-blue-950 text-white flex justify-center px-4 py-6 h-10 items-center'>
      <p className='text-center font-bold'>Copyright &copy; {currentYear}  Get Me A Chai - All rights reserved</p>
    </div>
  )
}

export default Footer
