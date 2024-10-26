# ChelseaFC Player

ChelseaFC 선수 리스트 및 각 선수 스탯 분석 웹사이트

## 구현할 기능
- 기본 Admin Dashboard Page
- 각 선수 카드 컴포넌트 제작 (클릭시 세부 페이지로 이동)
- 선수 세부 페이지를 위한 라우팅 (라우팅은 "선수 등번호를 베이스로 분류")
- 반응형 웹 (flex, grid, 미디어쿼리)
- 포지션 별 선수 주 스탯 다르게 제작 (공격수, 미드필더, 수비수, 골키퍼)

## 사용할 기술 스택
- Frontend: React.JS, SCSS(or TailwindCSS)
- Backend: X
- Mobile: PWA (Progress Web App)

### FotMob API 사용
- 리그별 ID 및 리그 탐색하기
```javascript
// 모든 리그 출력하기
let AllLeagues = await fotmob.getAllLeagues();

// Premier League
let league = await fotmob.getLeague("47", "overview", "league", "Premier League")

// Bundesliga
let league = await fotmob.getLeague("54", "overview", "league", "Bundesliga")

// Serie A
let league = await fotmob.getLeague("55", "overview", "league", "Serie A")
        
// Ligue 1
let league = await fotmob.getLeague("53", "overview", "league", "Ligue 1")

// Champions League
let league = await fotmob.getLeague("42", "overview", "league", "Champions League")

// Europa League
let league = await fotmob.getLeague("73", "overview", "league", "Europa League")

// FA Cup
let league = await fotmob.getLeague("132", "overview", "league", "FA Cup")

// World Cup
let league = await fotmob.getLeague("77", "overview", "league", "World Cup")

// EURO
let league = await fotmob.getLeague("50", "overview", "league", "EURO")
```

- 첼시 팀 ID 및 선수 접근하기

```javascript
// Chelsea FC
let team = await fotmob.getTeam("8455", "overview", "team", "Premier League/Chelsea")

// 코치 데이터 가져오기
let coach = team.squad[0].members
// 골키퍼 데이터 가져오기
let goalkeeper = team.squad[1].members
// 수비수 데이터 가져오기
let defender = team.squad[2].members
// 미드필더 데이터 가져오기
let midfielder = team.squad[3].members
// 공격수 데이터 가져오기
let attacker = team.squad[4].members


// 티아고 실바 선수 데이터 가져오기
let ThiagoSilva = await fotmob.getPlayer("80562")

// 엔조 페르난데스 선수 데이터 가져오기
let Enzo = await fotmob.getPlayer("1137705")
// 엔조 페르난데스 상세 정보
let EnzoStat = Enzo.careerHistory.careerItems.senior.seasonEntries[0].tournamentStats
```

- 경기 정보 접근하기
```javascript
// 특정 날짜의 경기 데이터 접근하기
let matches = await fotmob.getMatchesByDate("20240414");

// 특정 ID 경기 데이터 접근하기
let details = await fotmob.getMatchDetails("3399269")
```