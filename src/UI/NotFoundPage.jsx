import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleTakeHome = () => {
    navigate("/"); // 메인으로 가기
  };

  return (
    <div>
      <Header />
      <section
        className="relative w-[calc(100%-200px)] flex flex-col justify-center items-center 
      top-0 left-[200px] h-screen bg-background-gradient bg-cover bg-center 
      
      md:left-0 md:w-full md:h-[calc(100vh-100px)] sm:left-0 sm:w-full sm:h-[calc(100vh-190px)]"
        style={{ backgroundImage: "url('/img/chelsea.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative p-5 z-10 font-serif font-bold">
          <h3
            className="text-center text-white text-9xl my-5
          md:text-8xl sm:text-7xl"
          >
            404 Not Found
          </h3>
          <p
            className="relative text-customSkyblue text-4xl tracking-[0.075rem] my-3
          md:text-3xl md:my-2 sm:text-3xl"
          >
            Ooops...!
          </p>
          <p
            className="relative text-customSkyblue text-3xl mb-3
          md:text-[25px] sm:text-2xl"
          >
            Sorry, the page you are looking for cannot be found.
          </p>
          <div className="mt-4 text-white text-2xl">
            <button
              onClick={handleGoBack}
              className="w-72 h-12 bg-slate-800 rounded-md mr-7
            md:w-full md:px-4 md:m-0 sm:w-full sm:px-4 sm:m-0 "
            >
              &lt; Go Back
            </button>
            <button
              onClick={handleTakeHome}
              className="w-72 h-12 bg-customBlue rounded-md 
            md:mt-5 md:w-full md:px-4 sm:mt-5 sm:w-full sm:px-4"
            >
              Take me home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
