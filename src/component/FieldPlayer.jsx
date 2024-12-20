import React from 'react'
import { useSelector } from 'react-redux';

const FieldPlayer = () => {
    const stats = useSelector((state) => state.stats)
  const playerProfile = [
    { label: 'Nationality', value: stats.nationality },
    { label: 'Place of Birth', value: stats.placeOfBirth },
    { label: 'Position', value: stats.position },
    { label: 'Date of Birth', value: stats.dob },
    { label: 'Height', value: stats.height },
    { label: 'Debut', value: stats.debut },
  ]

    const playerProfile1 = [
      { label: 'Nationality', value: stats.nationality },
      { label: 'Place of Birth', value: stats.placeOfBirth },
      { label: 'Position', value: stats.position },
    ];
    const playerProfile2 = [
      { label: 'Date of Birth', value: stats.dob },
      { label: 'Height', value: stats.height },
      { label: 'Debut', value: stats.debut },
    ];

  return (
    <div className='w-full h-full min-h-screen bg-black bg-stat-gradient text-white '>
        <div className=''>
          {/* 선수 프로필 */}
          <div className='flex justify-around h-96 border border-blue-300 rounded-2xl mx-2 my-2 overflow-hidden md:flex-col md:h-full'>
            <div className='flex flex-row gap-10 md:h-80 md:overflow-hidden md:justify-center md:pt-6'>
              <div className='relative'>
                <div className='z-0 absolute bottom-[-50%] w-full h-full rounded-full bg-slate-800'>.</div>
                <img className='relative w-full h-full max-h-96 p-5 pb-0' src={`/img/player/${stats.season}/${stats.season}${stats.last_name}.webp`} alt="" />
              </div>
                <div className='flex flex-col justify-around ml-5 my-2'>
                  <p className=' text-slate-500 text-xl'>{stats.season} Season</p>
                  <div>
                    <h5 className='font-semibold text-4xl text-slate-300'>{stats.first_name}</h5>
                    <h4 className='font-bold text-6xl'>{stats.last_name}</h4>
                  </div>
                  <p className='text-8xl font-normal font-serif text-center text-slate-500'>{`${stats.backnumber}`}</p>
                </div>
            </div>
            
            <div className='flex flex-col justify-center gap-7 flex-wrap rounded-2xl md:flex-row md:py-8'>
              {/* 반복되는 부분 map 메서드 활용하여 간결하게 처리 */}
                    {
                      playerProfile.map((stat, index) => (
                        <div key={index} className='w-64 mx-2'>
                          <p className='text-slate-400 font-semibold text-sm'>{stat.label}</p>
                          <div className='flex items-center justify-center border border-blue-300 rounded-md h-14 font-serif font-bold mt-2.5'>
                            {stat.value}
                          </div>
                        </div>
                      ))
                    }
            </div>
          </div>
          <div className='flex h-full sm:flex-col'>
            <div className='flex-1 h-56 border border-blue-300 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
              <ul>
                {/* 출전 데이터 */}
                  <li>Appearances: {stats.appearances}</li>
                  <li>Minutes Played: {stats.minutesPlayed}</li>
                  <li>Starts: {stats.starts}</li>
                  <li>Subbed On/Off: {stats.subbedOnOff}</li>
              </ul>
            </div>
            <div className='flex-1 h-56 border border-blue-300 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
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
            <div className='flex-1 h-56 border border-blue-300 bg-[rgba(17, 25, 40, 0.75)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl m-2'>
              <ul>
                {/* 파울 데이터 */}
                  <li>Fouls Drawn: {stats.FoulsDrawn}</li>
                  <li>Fouls Committed: {stats.FoulsCommitted}</li>
              </ul>
            </div>
          </div>
          <div className='flex h-full flex-wrap sm:flex-col'>
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
          </div>
        </div>
    </div>
  )
}

export default FieldPlayer