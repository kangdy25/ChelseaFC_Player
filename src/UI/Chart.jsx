import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

// 플러그인 정의
const textCenter = {
    id: "textCenter",
    beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;

        ctx.restore();
        const fontSize = (height / 100).toFixed(2); // 크기 비율에 맞게 글자 크기 조정
        ctx.font = `bold ${fontSize}em sans-serif`;
        ctx.fillStyle = "white"; 
        ctx.textBaseline = "middle";
    
        const text = "75%"; // 가운데 표시할 텍스트
        const textX = Math.round((width - ctx.measureText(text).width) / 2); // 가로 중앙
        const textY = height / 2; // 세로 중앙
    

        ctx.fillText(text, textX, textY);
        ctx.save();
    },
};

const Chart = (props)=>{
    const {width, height} = props
    const data = {
        labels: ["Blue", "Grey"],
        datasets: [
            {
            label: ["blue", "grey"],
            data: [20, 80],
            backgroundColor: ["#003DA6", "#b7babd"],
            borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '80%', // 도넛 차트의 두께 조절 (기본값: 50%)
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    return (
        <Doughnut 
            data={data} 
            options={options} 
            plugins={[textCenter]} 
            style={{width: width, height: height}}/>
    );
}

export default Chart