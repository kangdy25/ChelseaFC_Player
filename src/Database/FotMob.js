import pkg from "fotmob";

export default async function fotmobFunc() {
    try {
        // Fotmob 클래스 가져오기
        const Fotmob = pkg.default;
        const fotmob = new Fotmob();
        
        // 날짜별 경기 출력하기
        let matches = await fotmob.getMatchesByDate("20240414");
        // 모든 리그 출력하기 
        let AllLeagues = await fotmob.getAllLeagues();
        
        // Premier League
        let league = await fotmob.getLeague("47", "overview", "league", "Premier League")
        // console.log(league.stats.teams)

        // Chelsea FC Data 가져오기
        let team = await fotmob.getTeam("8455", "overview", "team", "Premier League/Chelsea")
        // console.log(team)
        // Chelsea FC 수비수 데이터들 가져오기
        // console.log(team.squad[2].members)
        // Chelsea FC 미드필더 데이터들 가져오기
        // console.log(team.squad[3].members)

        // 티아고 실바 선수 데이터 가져오기
        // let player = await fotmob.getPlayer("80562")
        // 엔조 페르난데스 선수 2023/2024 시즌 데이터 가져오기
        let player = await fotmob.getPlayer("1137705")
        console.log(player.careerHistory.careerItems.senior.seasonEntries[0].tournamentStats)
        
    } catch {
        console.error('앙')
    }
}

// Fotmob API 실행하기
fotmobFunc();

// All League List

        
        // Champions League
        // let league = await fotmob.getLeague("42", "overview", "league", "Champions League")

        // Bundesliga
        // let league = await fotmob.getLeague("54", "overview", "league", "Bundesliga")

        // Serie A
        // let league = await fotmob.getLeague("55", "overview", "league", "Serie A")

        // World Cup
        // let league = await fotmob.getLeague("77", "overview", "league", "World Cup")
        
        // Europa League
        // let league = await fotmob.getLeague("73", "overview", "league", "Europa League")
        
        // Ligue 1
        // let league = await fotmob.getLeague("53", "overview", "league", "Ligue 1")

        // FA Cup
        // let league = await fotmob.getLeague("132", "overview", "league", "FA Cup")
        
        // EURO
        // let league = await fotmob.getLeague("50", "overview", "league", "EURO")

        // chelsea (teamId : 8455)


// let league = await fotmob.getLeague("42", "overview", "league", "America/New_York")
// let team = await fotmob.getTeam("6017", "overview", "team", "America/New_York")
// let player = await fotmob.getPlayer("1071179")
// let details = await fotmob.getMatchDetails("3399269")
// let worldNews = await fotmob.getWorldNews()
// let transfers = await fotmob.getTransfers();
// let AllLeagues = await fotmob.getAllLeagues();
// let teamSeasonStats = await fotmob.getTeamSeasonStats()
// let myCustomRequest = await fotmob.request("matches", { date: "20201020" })