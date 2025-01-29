import React from "react";
import { useSelector } from "react-redux";
import Chart from "../Chart";
import { getPlayerSaves } from "../../Database/playerStats.js";

const PlayerSaveStat = () => {
  const stats = useSelector((state) => state.stats);
  const playerSaves = getPlayerSaves(stats);

  return (
    <div className="flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[3px_1px_12px_0_rgba(101,149,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2">
      <h5 className="text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl">
        Saves
      </h5>
      <div className="flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3">
        {playerSaves.map((stat) => {
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
      <h6 className="text-2xl font-bold text-slate-300 text-center my-7 md:text-xl">
        Saves in Box
      </h6>
      <div className="flex flex-row justify-around mb-7 md:justify-center sm:flex-col sm:gap-7">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-serif text-xl font-semibold mb-5">Saves Inside</p>
          <div className="w-[250px] h-[250px] md:w-[200px]  md:h-[200px] sm:w-[150px] sm:h-[150px]">
            <Chart value={stats.savesInside} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-serif text-xl font-semibold mb-5">Saves Outside</p>
          <div className="w-[250px] h-[250px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px]">
            <Chart value={stats.savesOutside} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSaveStat;
