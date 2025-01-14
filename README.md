# Chelsea FC Player
![chelsea](./public/img/chelsea.jpg)

Chelsea FC 선수 리스트 및 각 선수 스탯 분석 웹사이트
## 배포 사이트
[👉🏻 프로젝트 바로가기](https://chelseafcplayer.com/)

## 구현할 기능
- Client Side Rendering, Single Page Application
- 각 선수 카드 컴포넌트 제작 (클릭 시 세부 페이지로 이동)
- 선수 세부 페이지를 위한 라우팅 (라우팅은 "시즌과 선수명"을 기준으로)
- 선수 데이터 크롤링 (puppeteer)
- Dashboard 스타일 세부 페이지 (크롤링 데이터 시각화)
- 반응형 웹 (flex, grid, media-query)
- 포지션 별 선수 주 스탯 다르게 제작 (필드플레이어 VS 골키퍼)
- 404 Page, Loading Page
- AWS 배포

## 사용할 기술 스택

### Front-end
- React.js (Client)
- React-router-dom (Routing)
- Tailwind CSS (Styling)
- Redux toolkit (State Management)
- Chart.js (Chart)
### Back-end
- Express.js (Server)
- Puppeteer (Crawling)
### Deployment
- Front: `AWS S3`, `AWS CloudFront`
- Back: `AWS EC2`, `Nginx`, `Certbot`
- Domain: `AWS ROUTE 53`

## 트러블 슈팅
1. 기존에는 FotMob API를 사용하여 데이터 렌더링을 진행하려 했으나, FotMob API가 현재 막히게 되었다. Chelsea FC 공식 웹사이트의 스탯을 크롤링하는 방식으로 변경하여 프로젝트를 진행한다.
2. AWS 배포 시, puppeteer가 브라우저를 찾지 못하는 문제가 있었다. (puppeteer 의존성 문제를 해결하고, 시스템 권한을 설정했다.)

### ⚠️ Chelsea FC Official Website 크롤링 주의사항
크롤링 하기 전 반드시 robots.txt 에 접속하여 크롤링이 가능한지 여부를 확인해야 한다.
(https://www.chelseafc.com 의 경우, 크롤링을 허용한다.)
