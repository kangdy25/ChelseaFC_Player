import React from 'react';
import './App.css';
import Header from './UI/Header.jsx';
import MainLayout from './UI/MainLayout.jsx';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        {/* 매인 페이지 */}
        <Route exact path="/" element={ 
          <div>
            <Header/>
            <MainLayout/>
          </div>
        } />
        {/* 선수별 스탯 상세 페이지 */}
        <Route path="/player/:seaon/:backnumber" element={ 
          <div>선수 스탯 페이지</div> 
          } />
      </Routes>
    </div>
  );
}

export default App;
