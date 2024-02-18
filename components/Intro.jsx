import React from 'react';


export default function Intro() {
  return (
    <>
      <div
        className='w-full h-screen bg-cover bg-center flex items-center justify-center flex-col'
        style={{ backgroundImage: `url('/background.jpg')` }}
      >
        <div className='w-full h-full flex items-center justify-center py-24'>
          <div className='w-2/3 h-full my-2 flex items-center justify-center text-center p-20 flex-col'>
            <h1 className='text-6xl font-semibold mb-4 text-black'>
             The Easiest Way to Get Your New Job
            </h1>
            <p className='text-lg mb-20 text-gray-400'>
             Join Thousands of Companies That Rely on Jobify
            </p>  
          </div>
        </div>
      </div>
    </>
  );
}
