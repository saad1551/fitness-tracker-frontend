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
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ 
      overflow: "hidden", 
      paddingTop: '20px', 
      paddingBottom: '30px',
      width: '100%',  // Set width to 100% to avoid overflow
      maxWidth: '500px',  // Optional: max-width for larger screens
      height: 'auto', // Height will adjust based on width
      aspectRatio: 1 // Maintain square aspect ratio
    }}>
      <h2 style={{ textAlign: 'center' }}>{metric}</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
