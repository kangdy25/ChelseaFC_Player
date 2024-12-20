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
    // 브라우저 및 페이지 초기화
    const browser = await puppeteer.launch({ headless: true }); // headless 모드
    const page = await browser.newPage();
    const { playerData } = req.body; 

    // 크롤링을 위한 데이터 셋업
    const createResponseData = (playerData, statValues = null, profileValues = null)=>{
        const isGoalkeeper = (playerData.role === 0);

        const defaultData = {
            fullname: 'x',
            nationality: 'x',
            placeOfBirth: 'x',
            position: 'x',
            dob: 'x',
            height: 'x',
            debut: 'x',

            appearances: 'x',
            minutesPlayed: 'x',
            starts: 'x',
            subbedOnOff: 'x',
            totalTouches: 'x',
            tacklesWonLost: 'x',
            Cleareances: 'x',
            Interceptions: 'x',
            DuelsWonLost: 'x',
            Blocks: 'x',
        };
    
        const extraData = isGoalkeeper
        ? {
            TotalSaves: 'x',
            CleanSheets: 'x',
            SavesMadeCatch: 'x',
            SavesMadePunch: 'x',
            Punches: 'x',
            Catches: 'x',
        }
        : {
            TotalGoals: 'x',
            GoalsPerMatch: 'x',
            MinutesPerGoal: 'x',
        };

        const commonData = {
            TotalPasses: 'x',
            KeyPasses: 'x',
            SuccessfulCrosses: 'x',
            Assists: 'x',
            FoulsDrawn: 'x',
            FoulsCommitted: 'x',
        };

        if (statValues && profileValues) {
            Object.assign(defaultData, {
                fullname: profileValues[0],
                nationality: profileValues[1],
                placeOfBirth: profileValues[2],
                position: profileValues[3],
                dob: profileValues[4],
                height: profileValues[5],
                debut: profileValues[6],

                appearances: statValues[0],
                minutesPlayed: statValues[1],
                starts: statValues[2],
                subbedOnOff: statValues[3],
                totalTouches: statValues[4],
                tacklesWonLost: statValues[5],
                Cleareances: statValues[6],
                Interceptions: statValues[7],
                DuelsWonLost: statValues[8],
                Blocks: statValues[9],
            });
    
            if (isGoalkeeper) {
                Object.assign(extraData, {
                    TotalSaves: statValues[10],
                    CleanSheets: statValues[11],
                    SavesMadeCatch: statValues[12],
                    SavesMadePunch: statValues[13],
                    Punches: statValues[14],
                    Catches: statValues[15],
                });
                Object.assign(commonData, {
                    TotalPasses: statValues[17],
                    KeyPasses: statValues[18],
                    SuccessfulCrosses: statValues[19],
                    Assists: statValues[20],
                    FoulsDrawn: statValues[21],
                    FoulsCommitted: statValues[22],
                }) 
            } else {
                Object.assign(extraData, {
                    TotalGoals: statValues[11],
                    GoalsPerMatch: statValues[12],
                    MinutesPerGoal: statValues[13],
                });
                Object.assign(commonData, {
                    TotalPasses: statValues[15],
                    KeyPasses: statValues[16],
                    SuccessfulCrosses: statValues[17],
                    Assists: statValues[18],
                    FoulsDrawn: statValues[19],
                    FoulsCommitted: statValues[20],
                }) 
            }
        }
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
        const profileValues = await page.$$eval('.profile-player-details__item-value', els => els.map(el => el.textContent.trim())); 

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
        console.log(targetText)

        // 요청 시즌과 동일한 세부 시즌 찾아서 클릭
        for (let value of seasonValues) {
            const text =  await page.evaluate((el) => el.textContent.trim(), value);
            console.log('찾은 년도 : ' + text)
            if (text === (targetText)) {
                await value.click(); // 텍스트가 일치하면 클릭
                console.log(`"${targetText}" 시즌을 클릭했습니다.`);
                onSeason = 1;
                break;
            } else {
                console.log('클릭 못함 ㅠㅠ');
                onSeason = 0;
            }
        }

        // 모든 스탯 요소의 정보들을 배열로 추출
        await page.waitForSelector('.player-stat__value');
        const statValues = await page.$$eval('.player-stat__value', els => els.map(el => el.textContent.trim())); 

        console.log(statValues)
        console.log(profileValues)
        console.log(playerData.role)

        // 크롤링한 데이터를 반환
        res.json(createResponseData(playerData, onSeason ? statValues : null, onSeason ? profileValues : null));
    } catch (error) {
        // 크롤링이 되지 않는 경우 'x' 데이터 제공
        try {
            res.json(createResponseData(playerData));
        } catch (error) {
            console.error('이것도 안 됨?')
        }
    } finally {
        await browser.close();
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