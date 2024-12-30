import React from 'react'
import PlayerProfileStat from '../UI/playerStat/PlayerProfileStat.jsx';
import PlayerAppearancesStat from '../UI/playerStat/PlayerAppearancesStat.jsx';
import PlayerPassStat from '../UI/playerStat/PlayerPassStat.jsx';
import PlayerSaveStat from '../UI/playerStat/PlayerSaveStat.jsx';

const Goalkeeper = () => {
  return (
    <div className='w-full h-full min-h-screen bg-black bg-stat-gradient text-white'>
      {/* 선수 프로필 데이터 */}
      <PlayerProfileStat/>

      {/* 선수 출전 데이터 */}
      <PlayerAppearancesStat/>

      <section className='flex h-full flex-wrap mb-3 md:flex-col sm:flex-col'>
        {/* 선수 선방 데이터 */}
        <PlayerSaveStat/>

        {/* 선수 패스 데이터 */}
        <PlayerPassStat/>
      </section>
    </div>
  )
}

export default Goalkeeper