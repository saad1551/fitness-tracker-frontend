import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ dataCounts, metric }) => {
  // Prepare data for the Pie chart
  const labels = Object.keys(dataCounts); // Get the keys as labels (e.g., apples, bananas, oranges, etc.)
  const values = Object.values(dataCounts); // Get the values as data points

  const data = {
    labels: labels,
    datasets: [
      {
        label: metric,
        data: values, // Assign counts as data
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56',
          '#4BC0C0', 
          '#9966FF', 
          '#FF9F40'  
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio to control the size
    layout: {
      padding: {
        top: 10,     // No padding at the top
        right: 0,   // No padding at the right
        bottom: 40, // 40px padding at the bottom
        left: 0     // No padding at the left
      },
    }
  };

  return (
    <div style={{ paddingTop:'50px', width: '500px', height: '500px' }}> {/* Adjust width and height as needed */}
      <h2>{metric}</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
