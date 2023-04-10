import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, getDatasetAtEvent } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function HorizontalBarChart() {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3004/projects");
  const [data, setData] = useState({
      labels: ['Project_1', 'Project_2', 'Project_3'],
      datasets: [
        {
          label: 'Completed',
          data: [100, 200, 300],
          borderColor: 'rgb(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'In Progress',
          data: [10, 20, 30],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        },
        {
          label: 'Not Started',
          data: [1, 2, 3],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.5)'
        },
      ],
    });
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Projects Tracking Status',
      },
      tooltip: {
        events: ['mousemove']
      }
    },
    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const projectNames = [];
      const completed = [];
      const inProgress = [];
      const notStarted = [];
      await fetch(baseUrl).then((data) => {
        const res = data.json();
        return res;
      })
      .then((res) => {
        console.log("res", res);
        for (const obj of res.data) {
          projectNames.push(obj.projectName);
          completed.push(parseInt(obj.completed));
          inProgress.push(parseInt(obj.inProgress));
          notStarted.push(parseInt(obj.notStarted));
        }
          setData({
            labels: projectNames,
            datasets: [
              {
                label: 'Completed',
                data: completed,
                borderColor: 'rgb(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
              },
              {
                label: 'In Progress',
                data: inProgress,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
              },
              {
                label: 'Not Started',
                data: notStarted,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)'
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

const chartRef = useRef();

const handleClick = (event) => {
  if (chartRef.current.length > 0) {
    // item[0] is the dataset index
    // item[1] is the data index
    alert(`You clicked on label: ${data.labels[chartRef.current[1]]}`);
  }
  console.log(getDatasetAtEvent(chartRef.current, event));
}

  return <Bar
  ref={chartRef}
  options={options} 
  data={data}
  onClick={handleClick}
  />;
}
