// puppeteer을 가져온다.
import puppeteer from 'puppeteer';

(async () => {
    // 브라우저 및 페이지 초기화
    const browser = await puppeteer.launch({ headless: false }); // headless 모드
    const page = await browser.newPage();
    
    // Sanchez의 프로필 URL로 이동
    await page.goto('https://www.chelseafc.com/en/teams/profile/robert-sanchez');
    
    // 페이지의 크기를 설정한다.
    await page.setViewport({
        width: 1080,
        height: 3000
    });

    await page.waitForSelector('.player-stat__value');
    // 모든 요소의 텍스트를 배열로 추출
    const values = await page.$$eval('.player-stat__value', els => els.map(el => el.textContent.trim())); 

    // 결과 출력
    console.log("배열의 크기 : " + values.length);
    console.log("Men's Team Appearances : " + values[0]); 
    console.log("Minutes Played : " + values[1]); 
    console.log("Starts : " + values[2]); 
    console.log("Subbed On / Off : " + values[3]); 
    console.log("Total Touches : " + values[4]); 
    console.log("Tackles Won / Lost : " + values[5]); 

    await browser.close();   
})();


