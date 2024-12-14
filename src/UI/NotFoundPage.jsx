import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleTakeHome = () => {
    navigate('/'); // 메인으로 가기
  };

  return (
    <div>
      <Header/>
      <section className='relative w-[calc(100%-200px)] flex flex-col justify-center items-center 
      top-0 left-[200px] h-screen bg-background-gradient bg-cover bg-center 
      
      md:left-0 md:w-full md:h-[calc(100vh-100px)] sm:left-0 sm:w-full sm:h-[calc(100vh-100px)]' 
      style={{ backgroundImage: "url('/img/chelsea.jpg')" }}>
        <div
          className="absolute inset-0 bg-black opacity-50 z-0"
        ></div>
        <div className='relative p-5 z-10'>
          <h3 className='text-center text-white text-[120px] font-bold font-serif 
          md:text-[100px] md:mb-2 sm:text-[70px] sm:mb-2'>404 Not Found</h3>
          <p className='relative text-customSkyblue text-[40px] font-bold font-serif tracking-[0.075rem] 
          md:text-[35px] sm:text-[25px]'>Ooops...!</p>
          <p className='relative text-customSkyblue text-[30px] font-bold font-serif 
          md:text-[25px] sm:text-[18px]'>Sorry, the page you are looking for cannot be found.</p>
          <div className='mt-4'>
            <button onClick={handleGoBack} className='w-72 h-12 font-bold font-serif text-white bg-slate-800 rounded-md mr-7 text-2xl
            md:w-full md:px-4 md:m-0 sm:w-full sm:px-4 sm:m-0 '>&lt; Go Back</button>
            <button onClick={handleTakeHome} className='w-72 h-12 font-bold font-serif text-white bg-customBlue rounded-md text-2xl 
            md:mt-5 md:w-full md:px-4 sm:mt-5 sm:w-full sm:px-4'>Take me home</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage