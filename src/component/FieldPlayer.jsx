import React from "react";
import PlayerProfileStat from "../UI/playerStat/PlayerProfileStat.jsx";
import PlayerAppearancesStat from "../UI/playerStat/PlayerAppearancesStat.jsx";
import PlayerGoalStat from "../UI/playerStat/PlayerGoalStat.jsx";
import PlayerPassStat from "../UI/playerStat/PlayerPassStat.jsx";

const FieldPlayer = () => {
  return (
    <div className="w-full h-full min-h-screen bg-black bg-stat-gradient text-white">
      {/* 선수 프로필 데이터 */}
      <PlayerProfileStat />

      {/* 선수 출전 데이터 */}
      <PlayerAppearancesStat />

      <section className="flex h-full flex-wrap md:flex-col sm:flex-col">
        {/* 선수 득점 데이터 */}
        <PlayerGoalStat />

        {/* 선수 패스 데이터 */}
        <PlayerPassStat />
      </section>
    </div>
  );
};

export default FieldPlayer;
