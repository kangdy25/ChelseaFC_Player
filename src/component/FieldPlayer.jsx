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
    ];
    
    // 출전 데이터 
    const playerAppearances = [
      { label: 'Team Appearances', value: stats.appearances },
      { label: 'Minutes Played', value: stats.minutesPlayed },
      { label: 'Starts', value: stats.starts },
      { label: 'Subbed On/Off', value: stats.subbedOnOff },
    ];

    // 터치 데이터
    const playerTouches = [
      { label: 'Total Touches', value: stats.totalTouches },
      { label: 'Tackles Won/Lost', value: stats.tacklesWonLost },
      { label: 'Clearances', value: stats.cleareances },
      { label: 'Interceptions', value: stats.interceptions },
      { label: 'Duels Won / Lost', value: stats.duelsWonLost },
      { label: 'Blocks', value: stats.blocks },
    ];
    
    // 파울 데이터 
    const playerFouls = [
      { label: 'Fouls Drawn', value: stats.foulsDrawn },
      { label: 'Fouls Committed', value: stats.foulsCommitted },
      { label: 'Yellow Card', value: stats.yellowCard},
      { label: 'Red Card', value: stats.redCard },
    ];

    // 득점 데이터
    const playerGoal = [
      { label: 'Total Goals', value: stats.totalGoals},
      { label: 'Goals Per Match', value: stats.goalsPerMatch},
      { label: 'Minutes Per Goal', value: stats.minutesPerGoal},
      
      { label: 'Goals Inside', value: stats.goalsInside},
      { label: 'Goals Outside', value: stats.goalsOutside},
      
      { label: 'Scored With Head', value: stats.scoredWithHead},
      { label: 'Scored With Right', value: stats.scoredWithRight},
      { label: 'Scored With Left', value: stats.scoredWithLeft},
      
      { label: 'Penalties', value: stats.penalties},
      { label: 'Free Kicks', value: stats.freeKicks},
    ];

    // 패스 데이터
    const playerPass = [
      { label: 'Total Passes', value: stats.totalPasses},
      { label: 'Key Passes', value: stats.keyPasses},
      { label: 'Successful Crosses', value: stats.successfulCrosses},
      { label: 'Assists', value: stats.assists},

      { label: 'Short Passes', value: stats.shortPass},
      { label: 'Long Passes', value: stats.longPass},
      { label: 'Pass Success Rate', value: stats.passSuccess},
    ];

  return (
    <main className='w-full h-full min-h-screen bg-black bg-stat-gradient text-white'>
          {/* 선수 프로필 */}
          <section className='flex border-t border-slate-600 justify-around shadow-[10px_20px_32px_0_rgba(101,112,239,0.75)] rounded-3xl h-96 mx-2 mt-5 my-2 overflow-hidden md:flex-col md:h-full sm:flex-col sm:h-full sm:justify-center sm:items-center'>
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
              {/* 반복되는 프로필 박스들을 map 메서드 활용하여 간결하게 처리 */}
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
                  <div key={index} className='flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[10px_10px_142px_0_rgba(101,112,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
                  <h5 className='text-2xl font-bold text-slate-300 text-center my-3'>{data[index]}</h5>
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
          <section className='flex h-full flex-wrap sm:flex-col'>
            {
              [playerGoal].map((content, index)=>{
                return (
                  <div key={index} className='flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[10px_10px_142px_0_rgba(101,112,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
                    <h5 className='text-2xl font-bold text-slate-300 text-center my-3'>Goals</h5>
                    <div className='flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3'>
                      {
                      content.map((stat, i)=>{
    
                          return(
                            <div key={i} className='font-serif mb-5'>
                              <p className={`text-md font-semibold`}>{stat.label}</p>
                              <div className='flex items-center flex-wrap justify-center border border-blue-300 rounded-md w-40 h-10 p-2 mt-1 font-bold text-white'>{stat.value}</div>
                            </div>
                          )
                        })
                      }
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[75%]"></div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            {
              [playerPass].map((content, index)=>{
                return (
                  <div key={index} className='flex-1 flex-wrap bg-[rgba(17, 25, 40, 0.75)] shadow-[10px_10px_142px_0_rgba(101,112,239,0.75)] backdrop-saturate-180 backdrop-blur-2xl rounded-2xl ml-2 my-2'>
                    <h5 className='text-2xl font-bold text-slate-300 text-center my-3'>Pass</h5>
                    <div className='flex flex-wrap justify-center items-center gap-x-10 p-3 mb-3'>
                      {
                      content.map((stat, i)=>{
    
                          return(
                            <div key={i} className='font-serif mb-5'>
                              <p className={`text-md font-semibold`}>{stat.label}</p>
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
    </main>
  )
}

export default FieldPlayer