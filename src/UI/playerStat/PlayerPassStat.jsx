import React from "react";
import Chart from "../Chart.jsx";
import { useSelector } from "react-redux";
import { getPlayerPasses } from "../../Database/playerStats.js";

const PlayerPassStat = () => {
  const stats = useSelector((state) => state.stats);
  const playerPasses = getPlayerPasses(stats);

  return (
    <div className="flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[10px_10px_142px_0_rgba(101,149,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2">
      <h5 className="text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl">
        Pass
      </h5>
      <div className="flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3">
        {playerPasses.map((stat) => {
          return (
            <div key={stat.label} className="font-serif mb-5">
              <p className="text-md font-semibold">{stat.label}</p>
              <div className="flex items-center flex-wrap justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center justify-center gap-6 mb-10">
        <h6 className="text-2xl font-bold text-slate-300 text-center my-4 md:text-xl">
          Pass Completion
        </h6>
        <div className="flex flex-row justify-center items-center mb-5 w-1/2 gap-7 md:flex-col sm:flex-col sm:w-2/3">
          <div className="w-full">
            <p className="font-serif text-md font-semibold py-4">Short Balls</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                style={{ width: `${stats.shortPass}%` }}
                className="bg-blue-600 h-2.5 rounded-full"
              ></div>
            </div>
          </div>
          <div className="flex justify-center items-center font-serif text-3xl font-semibold border rounded-[50%] h-24 w-32 md:h-32 md:w-32 sm:h-32 sm:w-32">
            {stats.shortPass}%
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-1/2 gap-7 md:flex-col sm:flex-col sm:w-2/3">
          <div className="w-full">
            <p className="font-serif text-md font-semibold py-4">Long Balls</p>
            <div className="w-[100%] bg-gray-200 rounded-full h-2.5">
              <div
                style={{ width: `${stats.longPass}%` }}
                className="bg-blue-600 h-2.5 rounded-full"
              ></div>
            </div>
          </div>
          <div className="flex justify-center items-center font-serif text-3xl font-semibold border rounded-[50%] h-24 w-32 md:h-32 md:w-32 sm:h-32 sm:w-32">
            {stats.longPass}%
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full mb-10">
        <p className="text-2xl font-bold text-slate-300 text-center mx-3 my-10 md:text-xl">
          Pass Success Rate
        </p>
        <div className="w-[300px] h-[300px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px]">
          <Chart value={stats.passSuccess} />
        </div>
      </div>
    </div>
  );
};

export default PlayerPassStat;
