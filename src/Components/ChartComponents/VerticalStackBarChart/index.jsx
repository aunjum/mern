import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Show all device statistics',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Desktop Computer',
      data: [10,20,30,40,50],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: 'Laptop',
      data: [20,20,70,40,10],
      backgroundColor: "rgb(54, 162, 235)",
    },
    {
      label: 'SmartPhone',
      data: [40,20,10,30,60],
      backgroundColor: "rgb(255, 205, 86)",
    },
    {
      label: 'Tablet Computer',
      data: [40,20,10,30,60],
      backgroundColor: 'purple',
    },
  ],
};


const VerticalStackBarChart = () => {
  return (
    <div>
        <Bar options={options} data={data} height={"500px"} width={'100%'}/>
    </div>
  )
}

export default VerticalStackBarChart