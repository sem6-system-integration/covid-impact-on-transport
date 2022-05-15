import React, {FC} from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {Bar} from 'react-chartjs-2';
import {CovidData} from '../../types/CovidData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface CovidChartProps {
    covidData1: CovidData;
    covidData2: CovidData;
    month: string;
}

const CovidChart: FC<CovidChartProps> = ({covidData1, covidData2, month}) => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Covid-19 Cases ${covidData1.deaths && covidData2.deaths ? 'and Deaths' : ''}`,
            },
        },
        maintainAspectRatio: true,
    }

    let chartData = {
        labels: covidData1.deaths && covidData2.deaths ? ["Cases", "Deaths"] : ["Cases"],
        datasets: [
            {
                label: `${month} ${covidData1.year}`,
                data: [covidData1.confirmed, covidData1.deaths],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `${month} ${covidData2.year}`,
                data: [covidData2.confirmed, covidData2.deaths],
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
