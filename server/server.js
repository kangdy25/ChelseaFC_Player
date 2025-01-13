import express from "express";
import puppeteer from 'puppeteer';
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'; 

const app = express();
const PORT = 3001;

// CORS 설정
app.use(cors({
    origin: ['https://chelseafcplayer.com', 'http://localhost:3000'], // 허용할 출처 배열
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'], // 필요한 헤더 추가
}));

// __dirname 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 요청 처리
app.use(express.json());

app.post('/player/:season/:name/crawl', async(req, res) => {
    // 브라우저 및 페이지 초기화
    const browser = await puppeteer.launch({ 
        headless: true,
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-background-networking',
        ],
    }); 
    const page = await browser.newPage();
    const { playerData } = req.body; 
    // 에러 시에도 렌더링을 위하여 프로필 변수는 전역변수로 선언
    let profileValues = null;

    // 크롤링을 위한 데이터 셋업
    const createResponseData = (playerData, 
        statValues = null, 
        profileValues = null, 
        cardValues = null, 
        shootValues = null,
        saveValues = null,
        passValues = null,
    )=>{
        const isGoalkeeper = (playerData.role === 0);
        // 골키퍼와 필드플레이어의 공통된 데이터
        const defaultData = {
            fullname: profileValues ? profileValues[0] : 'x',
            nationality: profileValues ? profileValues[1] : 'x',
            placeOfBirth: profileValues ? profileValues[2] : 'x',
            position: profileValues ? profileValues[3] : 'x',
            dob: profileValues ? profileValues[4] : 'x',
            height: profileValues ? profileValues[5] : 'x',
            debut: profileValues ? profileValues[6] : 'x',

            appearances: statValues ? statValues[0] : 'x',
            minutesPlayed: statValues ? statValues[1] : 'x',
            starts: statValues ? statValues[2] : 'x',
            subbedOnOff: statValues ? statValues[3] : 'x',
            totalTouches: statValues ? statValues[4] : 'x',
            tacklesWonLost: statValues ? statValues[5] : 'x',
            cleareances: statValues ? statValues[6] : 'x',
            interceptions: statValues ? statValues[7] : 'x',
            duelsWonLost: statValues ? statValues[8] : 'x',
            blocks: statValues ? statValues[9] : 'x',

            shortPass: statValues ? passValues[0] : 'x',
            longPass: statValues ? passValues[1] : 'x',
            passSuccess: statValues ? passValues[2] : 'x',
            
            yellowCard: cardValues ? cardValues[0] : 'x',
            redCard: cardValues ? cardValues[1] : 'x',
        };

        // 골키퍼와 필드플레이어의 서로 같지만 크롤링 시 인덱스가 다른 데이터
        const commonData = isGoalkeeper ? {
            totalPasses: statValues ? statValues[17] : 'x',
            keyPasses: statValues ? statValues[18] : 'x',
            successfulCrosses: statValues ? statValues[19] : 'x',
            assists: statValues ? statValues[20] : 'x',

            foulsDrawn: statValues ? statValues[21] : 'x',
            foulsCommitted: statValues ? statValues[22] : 'x',
        } : {
            totalPasses: statValues ? statValues[15] : 'x',
            keyPasses: statValues ? statValues[16] : 'x',
            successfulCrosses: statValues ? statValues[17] : 'x',
            assists: statValues ? statValues[18] : 'x',

            foulsDrawn: statValues ? statValues[19] : 'x',
            foulsCommitted: statValues ? statValues[20] : 'x',
        };
    
        // 골키퍼와 필드플레이어의 서로 다른 데이터
        const extraData = isGoalkeeper
        ? {
            totalSaves: statValues ? statValues[10] : 'x',
            cleanSheets: statValues ? statValues[11] : 'x',
            savesMadeCatch: statValues ? statValues[12] : 'x',
            savesMadePunch: statValues ? statValues[13] : 'x',
            punches: statValues ? statValues[14] : 'x',
            catches: statValues ? statValues[15] : 'x',
            savesInside: saveValues ? saveValues[0] : 'x',
            savesOutside: saveValues ? saveValues[1] : 'x',
        }
        : {
            totalGoals: statValues ? statValues[11] : 'x',
            goalsPerMatch: statValues ? statValues[12] : 'x',
            minutesPerGoal: statValues ? statValues[13] : 'x',
            goalsOutside: shootValues ? shootValues[0] : 'x',
            goalsInside: shootValues ? shootValues[1] : 'x',
            scoredWithHead: shootValues ? shootValues[2] : 'x',
            scoredWithRight: shootValues ? shootValues[3] : 'x',
            scoredWithLeft: shootValues ? shootValues[4] : 'x',
            penalties: shootValues ? shootValues[5] : 'x',
            freeKicks: shootValues ? shootValues[6] : 'x',
        };

        return {
            season: playerData.season,
            first_name: playerData.first_name,
            last_name: playerData.last_name,
            backnumber: playerData.backnumber,
            role: playerData.role,
            ...defaultData,
            ...extraData,
            ...commonData,
        };
    }

    // 크롤링 시작 코드
    try {
        let onSeason = 1;
        if (!playerData) {
            return res.status(400).json({ error: 'Player name is required' });
        }
        // 선수 프로필 URL로 이동
        await page.goto(`https://www.chelseafc.com/en/teams/profile/${playerData.url_name}`);
        // 페이지의 크기를 설정한다.
        await page.setViewport({ width: 1080, height: 3000 });

        // 선수 프로필 정보들을 배열로 추출
        await page.waitForSelector('.profile-player-details__item-value');
        profileValues = await page.$$eval('.profile-player-details__item-value', els => els.map(el => el.textContent.trim())); 

        // 시즌 정보 드롭다운 박스 클릭
        await page.waitForSelector('.dropdown__button', { timeout: 5000 });
        const element = await page.$$('.dropdown__button')
        await element[1].click()

        // 드롭다운의 세부 시즌 정보들을 배열로 추출
        await page.waitForSelector(`.dropdown__item`);
        const seasonValues =  await page.$$(`.dropdown__item`, els => els.map(el => el.textContent.trim()));
        
        // 요청 시즌 문자열 조정 (Ex. 2324 -> 2023/24)
        const seasonText = playerData.season.toString();
        const targetText = `20${seasonText.slice(0, 2)}/${seasonText.slice(2)}`

        // 요청 시즌과 동일한 세부 시즌 찾아서 클릭
        for (let value of seasonValues) {
            const text =  await page.evaluate((el) => el.textContent.trim(), value);
            if (text === (targetText)) {
                await value.click(); // 텍스트가 일치하면 클릭
                await page.waitForSelector('.player-stat__value', { timeout: 5000 });
                onSeason = 1;
                break;
            } else {
                onSeason = 0;
            }
        }

        // 모든 스탯 요소의 정보들을 배열로 추출
        await page.waitForSelector('.player-stat__value');
        const statValues = await page.$$eval('.player-stat__value', els => els.map(el => el.textContent.trim())); 

        // 엘로카드, 레드카드 정보 추출해서 배열로 선언
        await page.waitForSelector('.stats-fouls__yellow-cards__value');
        const yellowCard = await page.$eval('.stats-fouls__yellow-cards__value', el => el.textContent); 
        await page.waitForSelector('.stats-fouls__red-cards__value');
        const redCard = await page.$eval('.stats-fouls__red-cards__value', el => el.textContent); 
        const cardValues = [yellowCard, redCard];

        // 득점, 슈팅 정보 추출해서 배열로 선언
        let shootValues = null;
        if (playerData.role !== 0) {
            await page.waitForSelector('.stats-goals__box-stats__values-out');
            const goalsOutside = await page.$eval('.stats-goals__box-stats__values-out', el => el.textContent); 

            await page.waitForSelector('.stats-goals__box-stats__values-in');
            const goalsInside = await page.$eval('.stats-goals__box-stats__values-in', el => el.textContent);

            await page.waitForSelector('.stats-scored-with__head__value');
            const scoredWithHead = await page.$eval('.stats-scored-with__head__value', el => el.textContent); 

            // chelsea.com 공식 홈페이지의 셀렉터 표시 오류 (왼발-오른발)
            await page.waitForSelector('.stats-scored-with__right-foot__value');
            const scoredWithLeft = await page.$eval('.stats-scored-with__right-foot__value', el => el.textContent); 

            // chelsea.com 공식 홈페이지의 셀렉터 표시 오류 (왼발-오른발)
            await page.waitForSelector('.stats-scored-with__left-foot__value');
            const scoredWithRight = await page.$eval('.stats-scored-with__left-foot__value', el => el.textContent); 
            
            await page.waitForSelector('.stats-scored-with__penalty__value');
            const penalties = await page.$eval('.stats-scored-with__penalty__value', el => el.textContent);

            await page.waitForSelector('.stats-scored-with__free-kick__value');
            const freeKicks = await page.$eval('.stats-scored-with__free-kick__value', el => el.textContent); 

            shootValues = [goalsOutside, goalsInside, scoredWithHead, scoredWithRight, scoredWithLeft, penalties, freeKicks]
        }

        // 선방 정보 추출해서 배열로 선언
        let saveValues = null;
        if (playerData.role === 0) {
            await page.waitForSelector('.stats-goalkeeping__box-stats__values-out');
            const savesOutside = await page.$eval('.stats-goalkeeping__box-stats__values-out', el => el.textContent); 

            await page.waitForSelector('.stats-goalkeeping__box-stats__values-in');
            const savesInside = await page.$eval('.stats-goalkeeping__box-stats__values-in', el => el.textContent); 
            
            saveValues = [savesOutside, savesInside]
        }

        // 패스 정보 추출해서 배열로 선언
        await page.waitForSelector('.stats-pass-completion__value');
        const passCompletion = await page.$$eval('.stats-pass-completion__value', els => els.map(el => el.textContent.trim())); 
        
        await page.waitForSelector('.stats-pass-success__player-rank__percentage-value');
        const passSuccess = await page.$eval('.stats-pass-success__player-rank__percentage-value', el => el.textContent); 
        
        const passValues = [...passCompletion, passSuccess]

        // 크롤링한 데이터를 반환
        res.json(createResponseData(playerData, 
            statValues.length > 0 ? statValues : null,
            profileValues.length > 0 ? profileValues : null,
            cardValues.length > 0 ? cardValues : null,
            playerData.role !== 0 && shootValues.length > 0 ? shootValues : null,
            playerData.role === 0 && saveValues.length > 0 ? saveValues : null,
            passValues.length > 0 ? passValues : null,
        ));
    } catch (error) {
        // 크롤링이 되지 않는 경우 'x' 데이터 제공
        // 드롭다운 클릭 실패 또는 오류 발생 시에도 프로필 데이터는 렌더링되도록
        res.json(createResponseData(playerData, 
            null, 
            profileValues && profileValues.length > 0 ? profileValues : null
        ));
    } finally {
        if (browser) {
            await browser.close();
        }
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