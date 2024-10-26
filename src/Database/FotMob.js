import pkg from "fotmob";

export default async function fotmobFunc() {
    try {
        // Fotmob 클래스 가져오기
        const Fotmob = pkg.default;
        const fotmob = new Fotmob();
        
        // Premier League
        let league = await fotmob.getLeague("47", "overview", "league", "Premier League")
        
        // 엔조 페르난데스 선수 2023/2024 시즌 데이터 가져오기
        let player = await fotmob.getPlayer("1137705")
    } catch {
        console.error('앙')
    }
}

// Fotmob API 실행하기
fotmobFunc();