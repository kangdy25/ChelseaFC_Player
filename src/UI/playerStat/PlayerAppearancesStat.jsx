import React from "react";
import { useSelector } from "react-redux";
import {
  getPlayerAppearances,
  getPlayerTouches,
  getPlayerFouls,
} from "../../Database/playerStats";

const PlayerAppearancesStat = () => {
  const stats = useSelector((state) => state.stats);
  const playerAppearances = getPlayerAppearances(stats);
  const playerTouches = getPlayerTouches(stats);
  const playerFouls = getPlayerFouls(stats);

  return (
    <section className="flex flex-wrap sm:flex-col">
      {[playerAppearances, playerTouches, playerFouls].map((content, index) => {
        const data = ["Appearances", "Touches", "Fouls"];
        return (
          <div
            key={index}
            className="flex-1 flex-wrap shadow-[10px_10px_142px_0_rgba(101,149,239,0.75)] backdrop-blur-2xl rounded-2xl ml-2 my-2"
          >
            <h5 className="text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl">
              {data[index]}
            </h5>
            <div className="flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3">
              {content.map((stat) => {
                // 조건에 따른 동적 스타일 설정
                const bgColor =
                  stat.label === "Yellow Card"
                    ? "text-yellow-400"
                    : stat.label === "Red Card"
                    ? "text-red-500"
                    : "text-slate-400";

                return (
                  <div key={stat.label} className="font-serif mb-5">
                    <p className={`text-md font-semibold ${bgColor}`}>
                      {stat.label}
                    </p>
                    <div className="flex items-center justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold text-white">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PlayerAppearancesStat;
