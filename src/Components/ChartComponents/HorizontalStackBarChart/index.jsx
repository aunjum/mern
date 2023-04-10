
import React, { MouseEvent, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  Bar, 
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent, } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  plugins: {
    title: {
      display: true,
      text: 'Show all project statistics',
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
      label: 'Not Started',
      data: [10,20,30,40,50],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Running',
      data: [20,20,70,40,10],
      backgroundColor: 'rgb(53, 162, 235)',
    },
    {
      label: 'Completed',
      data: [40,20,10,30,60],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};


const HorizontalStackBarChart = () => {
  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <div>
        <Bar options={options} data={data}  ref={chartRef} onClick={onClick} height={"500px"} width={'100%'} />
    </div>
  )
}

export default HorizontalStackBarChart