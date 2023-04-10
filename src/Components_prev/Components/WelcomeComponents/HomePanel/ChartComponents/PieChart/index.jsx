import React, { useEffect, useState } from 'react';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend 
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Elemination Method Visualization',
      },
    },
  };

export function PieChart() {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3004/projects");
  const [data, setData] = useState({
    labels: ['Destory', 'Clear', 'Purge'],
    datasets: [
      {
        label: 'Device',
        data: [50, 100, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let des = 0;
      let clr = 0;
      let purg = 0;
      await fetch(baseUrl).then((data) => {
        const res = data.json();
        return res;
      })
      .then((res) => {
        console.log("res", res);
        for (const obj of res.data) {
          des = des + parseInt(obj.destroy);
          clr = clr + parseInt(obj.clear);
          purg = purg + parseInt(obj.purge);
        }
          setData({
            labels: ['Destory', 'Clear', 'Purge'],
            datasets: [
              {
                label: 'Device',
                data: [des, clr, purg],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
              },
            ],
          });
      })
      .catch( e => {
        console.log("error", e);
      })
    }
    fetchData();
},[]);


  return (
    <div 
      style={{width: '80%', height:'80%'}}>
      <Pie
      options={options} 
      data={data}
      />
    </div>
  );
}