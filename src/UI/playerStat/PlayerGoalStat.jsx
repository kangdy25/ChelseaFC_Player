import React from "react";
import { useSelector } from "react-redux";
import Chart from "../Chart.jsx";
import { getPlayerGoal1, getPlayerGoal2 } from "../../Database/playerStats.js";

const PlayerGoalStat = () => {
  const stats = useSelector((state) => state.stats);
  const playerGoal1 = getPlayerGoal1(stats);
  const playerGoal2 = getPlayerGoal2(stats);

  return (
    <div className="flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[10px_10px_142px_0_rgba(101,149,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2">
      <h5 className="text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl">
        Goals
      </h5>
      <div className="flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3">
        {playerGoal1.map((stat) => {
          return (
            <div key={stat.label} className="font-serif mb-5">
              <p className={`text-md font-semibold`}>{stat.label}</p>
              <div className="flex items-center flex-wrap justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold text-white">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
      <h6 className="text-2xl font-bold text-slate-300 text-center my-7 md:text-xl">
        Goals in Box
      </h6>
      <div className="flex flex-row justify-around md:justify-center sm:flex-col sm:gap-7">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-serif text-xl font-semibold mb-5">Goals Inside</p>
          <div className="w-[250px] h-[250px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px]">
            <Chart value={stats.goalsInside} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-serif text-xl font-semibold mb-5">Goals Outside</p>
          <div className="w-[250px] h-[250px] md:w-[200px]  md:h-[200px] sm:w-[150px] sm:h-[150px]">
            <Chart value={stats.goalsOutside} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-10 p-3 mt-10 my-5">
        {playerGoal2.map((stat) => {
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
    </div>
  );
};

export default PlayerGoalStat;
