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

export const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: `Flights`,
        },
    },
};

interface SecondChartProps {
    month: string;
    flightCount: number;
}

const SecondChart: FC<SecondChartProps> = ({month, flightCount}) => {
    let chartData = {
        labels: [month],
        datasets: [
            {
                label: 'Number of flights',
                data: [flightCount],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        // @ts-ignore
        <Bar options={chartOptions} data={chartData} type={"bar"}/>
    )
}

export default SecondChart;
