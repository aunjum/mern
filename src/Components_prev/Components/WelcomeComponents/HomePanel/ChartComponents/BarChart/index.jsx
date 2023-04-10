import React, { useEffect, useState } from 'react';
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
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Project > Device Type Visualization',
    },
  },
};

export function BarChart() {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3004/projects");
  const [data, setData] = useState({
    labels: ['Project_1', 'Project_2', 'Project_3', 'Project_4'],
    datasets: [
      {
        label: 'Desktop',
        data: [12, 19, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Laptop',
        data: [120, 300, 30],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'SmartPhone',
        data: [120, 190, 30],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Tablet',
        data: [12, 19, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ],
    });
    useEffect(() => {
      const fetchData = async () => {
        const projectNames = [];
        const desk = [];
        const lap = [];
        const smart = [];
        const tab = [];
        await fetch(baseUrl).then((data) => {
          const res = data.json();
          return res;
        })
        .then((res) => {
          console.log("res", res);
          for (const obj of res.data) {
            projectNames.push(obj.projectName);
            desk.push(parseInt(obj.desktop));
            lap.push(parseInt(obj.laptop));
            smart.push(parseInt(obj.smartPhone));
            tab.push(parseInt(obj.tablet));
          }
            setData({
              labels: projectNames,
    datasets: [
      {
        label: 'Desktop',
        data: desk,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Laptop',
        data: lap,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'SmartPhone',
        data: smart,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Tablet',
        data: tab,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ],
            });
        })
        .catch( e => {
          console.log("error", e);
        })
      }
      fetchData();
  },[]);

  return <Bar
  options={options}
  data={data}
  />;
}
