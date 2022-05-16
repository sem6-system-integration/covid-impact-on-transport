import React, {FC} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface FlightChartProps {
    year1: number;
    year2: number;
    month: string;
    flightCount1: number;
    flightCount2: number;
}

const FlightChart: FC<FlightChartProps> = ({year1, year2, month, flightCount1, flightCount2}) => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Flight count',
            },
        },
        maintainAspectRatio: true,
    }

    let chartData = {
        labels: ["Flight count"],
        datasets: [
            {
                label: `${month} ${year1}`,
                data: [flightCount1],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `${month} ${year2}`,
                data: [flightCount2],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    return (
        // @ts-ignore
        <Bar options={chartOptions} data={chartData} type={"bar"}/>
    )
}

export default FlightChart;
