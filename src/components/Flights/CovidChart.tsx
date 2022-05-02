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


interface CovidChartProps {
    year1: number;
    year2: number;
    month: string;
    covidCases1: number;
    covidCases2: number;
}

const CovidChart: FC<CovidChartProps> = ({year1, year2, month, covidCases1, covidCases2}) => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Covid-19 Cases',
            },
        },
    }

    let chartData = {
        labels: [month],
        datasets: [
            {
                label: year1,
                data: [covidCases1],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: year2,
                data: [covidCases2],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    return (
        // @ts-ignore
        <Bar options={chartOptions} data={chartData} type={"bar"}/>
    );
}

export default CovidChart;
