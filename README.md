# Chelsea FC Player
![chelsea](./public/img/chelsea.jpg)

Chelsea FC 선수 리스트 및 각 선수 스탯 분석 웹사이트
## 구현할 기능
- Dashboard 스타일 Page
- 각 선수 카드 컴포넌트 제작 (클릭 시 세부 페이지로 이동)
- 선수 세부 페이지를 위한 라우팅 (라우팅은 "시즌과 선수명"을 기준으로)
- 반응형 웹 (flex, grid, mediaquery)
- 선수 데이터 크롤링
- 포지션 별 선수 주 스탯 다르게 제작 (필드플레이어, 골키퍼)
- 404 Page

## 사용할 기술 스택
- React.js (front-end)
    - react-router-dom (Routing)
    - TailwindCSS (Styling)
    - Redux Toolkit (State Management)
- Node.js (Back-end)
    - Express.js (Server)
    - Puppeteer (Crawling)

## 트러블 슈팅
FotMob API가 현재 막히게 되었다.  
Chelsea FC 공식 웹사이트의 스탯을 크롤링하는 방식으로 변경하여 프로젝트를 진행한다.

### Chelsea FC Official Website 크롤링
크롤링 하기 전 반드시 robots.txt 에 접속하여 크롤링이 가능한지 여부를 확인해야 한다.
(https://www.chelseafc.com 의 경우, 크롤링을 허용한다.)