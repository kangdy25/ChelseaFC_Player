import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import "./index.css";
import Header from './UI/Header.jsx';
import MainLayout from './UI/MainLayout.jsx';
import NotFoundPage from './UI/NotFoundPage.jsx';
import PlayerStatPage from './UI/PlayerStatPage.jsx';

// Routing 유효성 검사
function RoutingValidation() {
  const seasonInfo = useSelector((state) => state.seasonInfo)
  const { season, name } = useParams();
  
  const isValidPlayer = seasonInfo.some((players)=>{
    return players.some(
      (player) => player.season === parseInt(season, 10) && player.url_name === name
    );
  });

  // 잘못된 URL인 경우, 404 Page로
  if (!isValidPlayer) {
    return <NotFoundPage />;
  }

  return <PlayerStatPage />;
}

function App() {
  return (
    <div className="App m-0">
      <Routes>
        {/* 매인 페이지 */}
        <Route exact path="/" element={ 
          <div>
            <Header/>
            <MainLayout/>
          </div>
        } />
        {/* 선수별 스탯 상세 페이지 */}
        <Route path="/player/:season/:name" element={ <RoutingValidation />} />
        {/* 모든 다른 경로에 대해 404로 리디렉션 */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
    </div>
  );
}

export default App;
