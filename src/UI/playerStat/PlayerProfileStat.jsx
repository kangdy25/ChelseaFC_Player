import React from 'react'
import { useSelector } from 'react-redux';
import { getPlayerProfile } from '../../Database/playerStats'

const PlayerProfileStat = () => {
    const stats = useSelector((state) => state.stats)
    const playerProfile = getPlayerProfile(stats);

    return (
        <section className='flex border-t border-slate-600 justify-around shadow-[10px_20px_32px_0_rgba(101,149,239,0.55)] rounded-3xl h-96 mx-2 mt-5 my-2 md:flex-col md:h-full sm:flex-col sm:h-full sm:justify-center sm:items-center'>
            <div className='flex flex-wrap gap-10 lg:gap-4 md:justify-center md:pt-6 sm:flex-col'>
                <img className='relative h-96 p-5 pb-0' src={`/img/player/${stats.season}/${stats.season}${stats.last_name}.webp`} alt="player-image" />
                <div className='flex flex-col justify-around text-slate-500 ml-5 my-2 sm:items-center sm:gap-4'>
                    <p className='text-xl'>{stats.season} Season</p>
                    <div>
                        <h4 className='font-semibold text-4xl text-slate-300 lg:text-3xl'>{stats.first_name}</h4>
                        <h3 className='font-bold text-slate-50 text-6xl lg:text-5xl'>{stats.last_name}</h3>
                    </div>
                    <p className='text-8xl font-normal font-serif text-center lg:text-7xl'>{`${stats.backnumber}`}</p>
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
    )
}

export default PlayerProfileStat