import React from 'react'
import { useSelector } from 'react-redux';
import Chart from '../UI/Chart';
import { 
  getPlayerProfile, getPlayerAppearances, getPlayerTouches, 
  getPlayerFouls, getPlayerSaves, getPlayerPasses 
} from '../Database/playerStats.js';

const Goalkeeper = () => {
    const stats = useSelector((state) => state.stats)

    const playerProfile = getPlayerProfile(stats);
    const playerAppearances = getPlayerAppearances(stats);
    const playerTouches = getPlayerTouches(stats);
    const playerFouls = getPlayerFouls(stats);
    const playerSaves = getPlayerSaves(stats);
    const playerPasses = getPlayerPasses(stats);

  return (
    <div className='w-full h-full min-h-screen bg-black bg-stat-gradient text-white'>
          {/* 선수 프로필 */}
          <section className='flex border-t border-slate-600 justify-around shadow-[1px_2px_20px_0_rgba(101,149,239,0.75)] rounded-3xl h-96 mx-2 mt-5 my-2 overflow-hidden md:flex-col md:h-full sm:flex-col sm:h-full sm:justify-center sm:items-center'>
            <div className='flex flex-wrap gap-10 lg:gap-4 md:justify-center md:pt-6 sm:flex-col'>
              <img className='relative h-96 p-5 pb-0' src={`/img/player/${stats.season}/${stats.season}${stats.last_name}.webp`} alt="" />
              <div className='flex flex-col justify-around ml-5 my-2 sm:items-center sm:gap-4'>
                  <p className=' text-slate-500 text-xl'>{stats.season} Season</p>
                  <div>
                    <h4 className='font-semibold text-4xl text-slate-300 lg:text-3xl'>{stats.first_name}</h4>
                    <h3 className='font-bold text-6xl lg:text-5xl'>{stats.last_name}</h3>
                  </div>
                  <p className='text-8xl font-normal font-serif text-center text-slate-500 lg:text-7xl'>{`${stats.backnumber}`}</p>
              </div>
            </div>
            
            <div className='flex flex-col justify-center gap-7 flex-wrap rounded-2xl lg:gap-4 md:flex-row md:py-8 sm:mb-7'>
              {
                playerProfile.map((stat, index) => (
                  <div key={index} className='w-64 mx-1 lg:w-48'>
                    <p className='text-slate-400 font-semibold text-sm'>{stat.label}</p>
                    <div className='flex items-center flex-wrap justify-center border border-blue-300 rounded-md h-16 font-serif font-bold p-2 mt-2.5'>
                      {stat.value}
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
          <section className='flex h-full flex-wrap sm:flex-col'>
            {
              [playerAppearances, playerTouches, playerFouls].map((content, index)=>{
                const data = ['Appearances', 'Touches', 'Fouls']
                return (
                  <div key={index} className='flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[1px_3px_12px_1px_rgba(101,149,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
                  <h5 className='text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl'>{data[index]}</h5>
                  <div className='flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3'>
                    {
                      content.map((stat, i)=>{
                        // 조건에 따른 동적 스타일 설정
                        const bgColor =
                        stat.label === 'Yellow Card' ? 'text-yellow-400' :
                        stat.label === 'Red Card' ? 'text-red-500' :
                        'text-slate-400';

                        return(
                          <div key={i} className='font-serif mb-5'>
                            <p className={`text-md font-semibold ${bgColor}`}>{stat.label}</p>
                            <div className='flex items-center flex-wrap justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold text-white'>{stat.value}</div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                )
              })
            }
          </section>
          <section className='flex h-full flex-wrap mb-3 md:flex-col sm:flex-col'>
          <div className='flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[3px_1px_12px_0_rgba(101,149,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
            <h5 className='text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl'>Saves</h5>
            <div className='flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3'>
              {
              playerSaves.map((stat, i)=>{
                return(
                  <div key={i} className='font-serif mb-5'>
                      <p className={`text-md font-semibold`}>{stat.label}</p>
                      <div className='flex items-center flex-wrap justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold text-white'>{stat.value}</div>
                  </div>
                  )
                })
              }
              </div>
              <div className='flex flex-row justify-around mb-7 md:justify-center sm:flex-col sm:gap-7'>
                <div className='flex flex-col items-center justify-center w-full'>
                  <p className='font-serif text-xl font-semibold mb-5'>Saves Inside</p>
                  <div className='w-[250px] h-[250px] md:w-[200px]  md:h-[200px] sm:w-[150px] sm:h-[150px]'>
                    <Chart value={stats.savesInside}/>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                  <p className='font-serif text-xl font-semibold mb-5'>Saves Outside</p>
                  <div className='w-[250px] h-[250px] md:w-[200px]  md:h-[200px] sm:w-[150px] sm:h-[150px]'>
                    <Chart value={stats.savesOutside}/>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[10px_10px_142px_0_rgba(101,149,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
              <h5 className='text-3xl font-bold text-slate-300 text-center my-4 md:text-2xl'>Pass</h5>
              <div className='flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3'>
                {
                playerPasses.map((stat, i)=>{
                    return(
                      <div key={i} className='font-serif mb-5'>
                        <p className='text-md font-semibold'>{stat.label}</p>
                        <div className='flex items-center flex-wrap justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold text-white'>{stat.value}</div>
                        </div>
                      )
                  })
                }
              </div>
              <div className='flex flex-col items-center justify-center gap-6 mb-10'>
                <h6 className='text-2xl font-bold text-slate-300 text-center my-4 md:text-xl'>Pass Completion</h6>
                <div className='flex flex-row justify-center items-center mb-5 w-1/2 gap-7 md:flex-col sm:flex-col sm:w-2/3'>
                  <div className='w-full'>
                    <p className='font-serif text-md font-semibold py-4'>Short Balls</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div style={{ width: `${stats.shortPass}%` }} className="bg-blue-600 h-2.5 rounded-full"></div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center font-serif text-3xl font-semibold border rounded-[50%] h-24 w-32 md:h-32 md:w-32 sm:h-32 sm:w-32'>{stats.shortPass}%</div>
                </div>
                <div className='flex flex-row justify-center items-center w-1/2 gap-7 md:flex-col sm:flex-col sm:w-2/3'>
                  <div className='w-full'>
                    <p className='font-serif text-md font-semibold py-4'>Long Balls</p>
                    <div className="w-[100%] bg-gray-200 rounded-full h-2.5">
                      <div style={{ width: `${stats.longPass}%` }} className="bg-blue-600 h-2.5 rounded-full"></div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center font-serif text-3xl font-semibold border rounded-[50%] h-24 w-32 md:h-32 md:w-32 sm:h-32 sm:w-32'>{stats.longPass}%</div>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full mb-10'>
                <p className='text-2xl font-bold text-slate-300 text-center mx-3 my-10 md:text-xl'>Pass Success Rate</p>
                <div className='w-[300px] h-[300px] md:w-[200px]  md:h-[200px] sm:w-[150px] sm:h-[150px]'>
                  <Chart value={stats.passSuccess}/>
                </div>
              </div>
            </div>
          </section>
    </div>
  )
}

export default Goalkeeper