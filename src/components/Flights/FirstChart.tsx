import React, {FC} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
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
            text: 'Covid cases',
        },
    },
};


interface FirstChartProps {
    month: string;
    covidCases: number;
}

const FirstChart: FC<FirstChartProps> = ({month, covidCases}) => {
    let chartData = {
        labels: [month],
        datasets: [
            {
                label: 'Number of COVID-19 cases',
                data: [covidCases],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };


    return (
        // @ts-ignore
        <Bar options={chartOptions} data={chartData} type={"bar"}/>
    );
}

export default FirstChart;
