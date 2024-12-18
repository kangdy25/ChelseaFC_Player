import React from 'react'
import { useSelector } from 'react-redux';

const FieldPlayer = () => {
    const stats = useSelector((state) => state.stats)
    
  return (
    <div className='block w-full h-screen bg-black bg-stat-gradient text-white'>
        <div>
          <div className='flex md:flex-col'>
            {/* 선수 프로필 */}
            <div className='flex-1 h-56 border border-blue-300 rounded-2xl ml-2 my-2'>
              <img className='h-full float-left md:h-20' src={`/img/player/${stats.season}/${stats.season}${stats.last_name}.webp`} alt="" />
                <h4 className='float-start text-lg mt-5'>{`${stats.season} - ${stats.first_name} ${stats.last_name}`}</h4>
            </div>
            <div className='flex-1 h-56 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl border border-slate-500  rounded-2xl ml-2 my-2'>
              <ul>
                {/* 출전 데이터 */}
                  <li>Appearances: {stats.appearances}</li>
                  <li>Minutes Played: {stats.minutesPlayed}</li>
                  <li>Starts: {stats.starts}</li>
                  <li>Subbed On/Off: {stats.subbedOnOff}</li>
              </ul>
            </div>
            <div className='flex-1 h-56 border border-blue-300 rounded-2xl m-2'>
              <ul>
                {/* 볼 터치 데이터 */}
                  <li>Total Touches: {stats.totalTouches}</li>
                  <li>Tackles Won/Lost: {stats.tacklesWonLost}</li>
                  <li>Clearances: {stats.Cleareances}</li>
                  <li>Interceptions: {stats.Interceptions}</li>
                  <li>Duels Won / Lost: {stats.DuelsWonLost}</li>
                  <li>Blocks: {stats.Blocks}</li>
              </ul>
            </div>
          </div>
          <div className='flex md:flex-col'>
            <div className='flex-1 h-56 border border-blue-300 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
              <ul>
                {/* 득점 데이터 */}
                  <li>Total Goals: {stats.TotalGoals}</li>
                  <li>Goals Per Match: {stats.GoalsPerMatch}</li>
                  <li>Minutes Per Goal: {stats.MinutesPerGoal}</li>
              </ul>
            </div>
            <div className='flex-1 h-56 border border-blue-300 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
              <ul>
                {/* 패스 데이터 */}
                  <li>Total Passes: {stats.TotalPasses}</li>
                  <li>Key Passes: {stats.KeyPasses}</li>
                  <li>Successful Crosses: {stats.SuccessfulCrosses}</li>
                  <li>Assists: {stats.Assists}</li>
              </ul>
            </div>
            <div className='flex-1 h-56 border border-blue-300 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl m-2'>
              <ul>
                {/* 파울 데이터 */}
                  <li>Fouls Drawn: {stats.FoulsDrawn}</li>
                  <li>Fouls Committed: {stats.FoulsCommitted}</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FieldPlayer