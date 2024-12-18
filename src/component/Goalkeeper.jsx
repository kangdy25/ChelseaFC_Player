import React from 'react'
import { useSelector } from 'react-redux';

const Goalkeeper = () => {
    const stats = useSelector((state) => state.stats)
    
  return (
    <div>
        <h4 className='text-lg mt-5'>{`${stats.season} - ${stats.first_name} ${stats.last_name}`}</h4>
        <ul>
          {/* 출전 데이터 */}
            <li>Appearances: {stats.appearances}</li>
            <li>Minutes Played: {stats.minutesPlayed}</li>
            <li>Starts: {stats.starts}</li>
            <li>Subbed On/Off: {stats.subbedOnOff}</li>

          {/* 볼 터치 데이터 */}
            <li>Total Touches: {stats.totalTouches}</li>
            <li>Tackles Won/Lost: {stats.tacklesWonLost}</li>
            <li>Clearances: {stats.Cleareances}</li>
            <li>Interceptions: {stats.Interceptions}</li>
            <li>Duels Won / Lost: {stats.DuelsWonLost}</li>
            <li>Blocks: {stats.Blocks}</li>
        
          {/* 세이브 데이터 */}
            <li>Total Saves: {stats.TotalSaves}</li>
            <li>Clean Sheets: {stats.CleanSheets}</li>
            <li>Saves Made - Catch: {stats.SavesMadeCatch}</li>
            <li>Saves Made - Punch: {stats.SavesMadePunch}</li>
            <li>Punches: {stats.Punches}</li>
            <li>Catches: {stats.Catches}</li>

          {/* 패스 데이터 */}
            <li>Total Passes: {stats.TotalPasses}</li>
            <li>Key Passes: {stats.KeyPasses}</li>
            <li>Successful Crosses: {stats.SuccessfulCrosses}</li>
            <li>Assists: {stats.Assists}</li>

          {/* 파울 데이터 */}
            <li>Fouls Drawn: {stats.FoulsDrawn}</li>
            <li>Fouls Committed: {stats.FoulsCommitted}</li>
        </ul>
    </div>
  )
}

export default Goalkeeper