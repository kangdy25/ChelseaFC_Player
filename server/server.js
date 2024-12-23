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
    const browser = await puppeteer.launch({ headless: true }); 
    const page = await browser.newPage();
    const { playerData } = req.body; 

    // 크롤링을 위한 데이터 셋업
    const createResponseData = (playerData, 
        statValues = null, 
        profileValues = null, 
        cardValues = null, 
        shootValues = null,
        // passValues = null
    )=>{
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
            cleareances: 'x',
            interceptions: 'x',
            duelsWonLost: 'x',
            blocks: 'x',
        };
    
        const extraData = isGoalkeeper
        ? {
            totalSaves: 'x',
            cleanSheets: 'x',
            savesMadeCatch: 'x',
            savesMadePunch: 'x',
            punches: 'x',
            catches: 'x',
        }
        : {
            totalGoals: 'x',
            goalsPerMatch: 'x',
            minutesPerGoal: 'x',
            goalsOutside: 'x',
            goalsInside: 'x',
            scoredWithHead: 'x',
            scoredWithRight: 'x',
            scoredWithLeft: 'x',
            penalties: 'x',
            freeKicks: 'x',
        };

        const commonData = {
            totalPasses: 'x',
            keyPasses: 'x',
            successfulCrosses: 'x',
            assists: 'x',

            foulsDrawn: 'x',
            foulsCommitted: 'x',
            yellowCard: 'x',
            redCard: 'x',
        };

        if (statValues && profileValues && cardValues || shootValues) {
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
                cleareances: statValues[6],
                interceptions: statValues[7],
                duelsWonLost: statValues[8],
                blocks: statValues[9],
            });
    
            if (isGoalkeeper) {
                Object.assign(extraData, {
                    totalSaves: statValues[10],
                    cleanSheets: statValues[11],
                    savesMadeCatch: statValues[12],
                    savesMadePunch: statValues[13],
                    punches: statValues[14],
                    catches: statValues[15],
                });
                Object.assign(commonData, {
                    totalPasses: statValues[17],
                    keyPasses: statValues[18],
                    successfulCrosses: statValues[19],
                    assists: statValues[20],
                    foulsDrawn: statValues[21],
                    foulsCommitted: statValues[22],
                    yellowCard: cardValues[0],
                    redCard: cardValues[1],
                }) 
            } else {
                Object.assign(extraData, {
                    totalGoals: statValues[11],
                    goalsPerMatch: statValues[12],
                    minutesPerGoal: statValues[13],
                    goalsOutside: shootValues[0],
                    goalsInside: shootValues[1],
                    scoredWithHead: shootValues[2],
                    scoredWithRight: shootValues[3],
                    scoredWithLeft: shootValues[4],
                    penalties: shootValues[5],
                    freeKicks: shootValues[6],
                });
                Object.assign(commonData, {
                    totalPasses: statValues[15],
                    keyPasses: statValues[16],
                    successfulCrosses: statValues[17],
                    assists: statValues[18],
                    foulsDrawn: statValues[19],
                    foulsCommitted: statValues[20],
                    yellowCard: cardValues[0],
                    redCard: cardValues[1],
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
                await page.waitForSelector('.player-stat__value', { timeout: 5000 });
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

        // 엘로카드, 레드카드 정보 추출해서 배열로 선언
        await page.waitForSelector('.stats-fouls__yellow-cards__value');
        const yellowCard = await page.$eval('.stats-fouls__yellow-cards__value', el => el.textContent); 
        await page.waitForSelector('.stats-fouls__red-cards__value');
        const redCard = await page.$eval('.stats-fouls__red-cards__value', el => el.textContent); 

        const cardValues = [yellowCard, redCard]

        // 득점, 슈팅 정보 추출해서 배열로 선언
        await page.waitForSelector('.stats-goals__box-stats__values-out');
        const goalsOutside = await page.$eval('.stats-goals__box-stats__values-out', el => el.textContent); 

        await page.waitForSelector('.stats-goals__box-stats__values-in');
        const goalsInside = await page.$eval('.stats-goals__box-stats__values-in', el => el.textContent);

        await page.waitForSelector('.stats-scored-with__head__value');
        const scoredWithHead = await page.$eval('.stats-scored-with__head__value', el => el.textContent); 

        await page.waitForSelector('.stats-scored-with__right-foot__value');
        const scoredWithRight = await page.$eval('.stats-scored-with__right-foot__value', el => el.textContent); 

        await page.waitForSelector('.stats-scored-with__left-foot__value');
        const scoredWithLeft = await page.$eval('.stats-scored-with__left-foot__value', el => el.textContent); 

        await page.waitForSelector('.stats-scored-with__penalty__value');
        const penalties = await page.$eval('.stats-scored-with__penalty__value', el => el.textContent);

        await page.waitForSelector('.stats-scored-with__free-kick__value');
        const freeKicks = await page.$eval('.stats-scored-with__free-kick__value', el => el.textContent); 

        const shootValues = [goalsOutside, goalsInside, scoredWithHead, scoredWithRight, scoredWithLeft, penalties, freeKicks]

        // 패스 정보 추출해서 배열로 선언
        // const shortPass = await page.$$eval('.stats-pass-completion__value', els => els.map(el => el.textContent.trim())); 
        
        // const passValues = []        
    
        console.log(statValues)
        console.log(profileValues)
        console.log(cardValues)
        console.log(shootValues)

        // 크롤링한 데이터를 반환
        res.json(createResponseData(playerData, 
            statValues.length > 0 ? statValues : null,
            profileValues.length > 0 ? profileValues : null,
            cardValues.length > 0 ? cardValues : null,
            shootValues.length > 0 ? shootValues : null
            // onSeason ? passValues : null
        ));
    } catch (error) {
        // 크롤링이 되지 않는 경우 'x' 데이터 제공
        try {
            res.json(createResponseData(playerData));
        } catch (error) {
            console.error('이것도 안 됨?')
        }
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