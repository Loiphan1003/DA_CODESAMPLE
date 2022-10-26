import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);



export default function ChartOverview({Arr}) {


    const data = {
        labels: ['Điểm < 5', 'Điểm >= 5', 'Điểm = 10'],
        datasets: [
          {
            label: '# of Votes',
            data: Arr,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1,
          },
        ],
      };
    
  return <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} >

  <div style={{width: "40%"}} >
    <Pie data={data} />
  </div>
  </div>
  ;
}
