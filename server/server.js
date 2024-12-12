import express from "express";
import puppeteer from 'puppeteer';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

// __dirname 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 요청 처리
app.use(express.json());

app.post('/crawl', async(req, res) => {
    console.log(req.body)
    try {
        const { playerData } = req.body; 
        if (!playerData) {
            return res.status(400).json({ error: 'Player name is required' });
        }

        // 첼시 선수가 아닌 경우 404 에러
        if(!playerData.isChelsea) {
            return res.status(404).json({ message: "Player not found on Chelsea roster" });
        }

        // 브라우저 및 페이지 초기화
        const browser = await puppeteer.launch({ headless: false }); // headless 모드
        const page = await browser.newPage();

        // Sanchez의 프로필 URL로 이동
        await page.goto(`https://www.chelseafc.com/en/teams/profile/${playerData.url_name}`);
        // 페이지의 크기를 설정한다.
        await page.setViewport({ width: 1080, height: 3000 });

        await page.waitForSelector('.player-stat__value');

        // 모든 요소의 텍스트를 배열로 추출
        const values = await page.$$eval('.player-stat__value', els => els.map(el => el.textContent.trim())); 

        await browser.close();

        // 크롤링한 데이터를 반환
        res.json({
            appearances: values[0],
            minutesPlayed: values[1],
            starts: values[2],
            subbedOnOff: values[3],
            totalTouches: values[4],
            tacklesWonLost: values[5],
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during crawling.');
    }
})

// React 정적 파일 서빙
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// React 앱의 라우팅 처리
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});