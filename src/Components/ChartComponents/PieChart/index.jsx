import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Show all process statistics',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  
};

export const data = {
  labels: ['Purge', 'Erase', 'Destroy'],
  datasets: [
    {
      label: 'Total Track ID',
      data: [12, 8, 5],
      backgroundColor: [
        'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
       
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1,
    },
  ],
};


const PieChart = () => {
  return (
    <div>
     <Pie options={options} data={data} height={'500px'}/>
    </div>
  )
}

export default PieChart