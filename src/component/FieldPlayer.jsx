import React from 'react'
import { useSelector } from 'react-redux';

const FieldPlayer = () => {
    const stats = useSelector((state) => state.stats)
    
  return (
    <div>
        <h4 className='text-lg mt-5'>{`${stats.season} - ${stats.first_name} ${stats.last_name}`}</h4>
        <ul>
            <li>Appearances: {stats.appearances}</li>
            <li>Minutes Played: {stats.minutesPlayed}</li>
            <li>Starts: {stats.starts}</li>
            <li>Subbed On/Off: {stats.subbedOnOff}</li>

            <li>Total Touches: {stats.totalTouches}</li>
            <li>Tackles Won/Lost: {stats.tacklesWonLost}</li>
            <li>Clearances: {stats.Cleareances}</li>
            <li>Interceptions: {stats.Interceptions}</li>
            <li>Duels Won / Lost: {stats.DuelsWonLost}</li>
            <li>Blocks: {stats.Blocks}</li>

            <li>Total Goals: {stats.TotalGoals}</li>
            <li>Goals Per Match: {stats.GoalsPerMatch}</li>
            <li>Minutes Per Goal: {stats.MinutesPerGoal}</li>

            <li>Total Passes: {stats.TotalPasses}</li>
            <li>Key Passes: {stats.KeyPasses}</li>
            <li>Successful Crosses: {stats.SuccessfulCrosses}</li>
            <li>Assists: {stats.Assists}</li>

            <li>Fouls Drawn: {stats.FoulsDrawn}</li>
            <li>Fouls Committed: {stats.FoulsCommitted}</li>
        </ul>
    </div>
  )
}

export default FieldPlayer