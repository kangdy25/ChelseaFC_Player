import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props)=>{
    const text = `${props.value}`; // 가운데 표시할 텍스트
    const isNan = (text === 'x')
    const number = isNan ? 0 : parseInt(text.slice(0, -1)); // % 기호 빼고 숫자만 남기기
    
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
        
            const textX = Math.round((width - ctx.measureText(text).width) / 2); // 가로 중앙
            const textY = height / 2; // 세로 중앙
    
            ctx.fillText(text, textX, textY);
            ctx.save();
        },
    };

    const data = {
        labels: ["Blue", "Grey"],
        datasets: [
            {
                label: ["blue", "grey"],
                data: [number, 100-number],
                backgroundColor: ["rgba(25, 24, 246, 0.8)", "rgba(147, 147, 147, 0.6)"],
                borderWidth: 0.5,
                borderColor: ['rgba(1, 148, 248, 0.75)', '#333333']
            },
        ],
    };

    const options = {
        cutout: '85%', // 도넛 차트의 두께 조절 (기본값: 50%)
        plugins: {
            legend: { display: false }
        }
    };

    return (
        <Doughnut data={data} options={options} plugins={[textCenter]} />
    );
}

export default Chart