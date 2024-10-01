import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2'; // Importing the Chart.js Bar component
import 'chart.js/auto'; // Ensure you have chart.js auto imported

const ProgressCharts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('thisWeek'); // 'thisWeek', 'thisMonth', 'thisYear'

  // Fetch data from the backend
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/workouts/progresscharts`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error loading progress charts.");
        setLoading(false);
      }
    };
    fetchProgressData();
  }, []);

  // Function to render statistics based on the active tab
  const renderStatistics = () => {
    if (!data) return null;

    let stats;
    switch (activeTab) {
      case 'thisWeek':
        stats = data.thisWeek;
        break;
      case 'thisMonth':
        stats = data.thisMonth;
        break;
      case 'thisYear':
        stats = data.thisYear;
        break;
      default:
        stats = data.thisWeek;
    }

    return (
      <Row className="text-center mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Workouts Completed</Card.Title>
              <Card.Text>{stats.workoutsCompleted}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {activeTab === 'thisWeek' ? (
  <>
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>Total Time Spent (Hours)</Card.Title>
          <Card.Text>{stats.totalTimeSpent.toFixed(4)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>Average Time Spent (Hours)</Card.Title>
          <Card.Text>{stats.averageTimeSpent.toFixed(4)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </>
) : (
  <Col>
    <Card>
      <Card.Body>
        <Card.Title>Total Time Spent (Hours)</Card.Title>
        <Card.Text>{stats.timeSpent.toFixed(4)}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
)}

      </Row>
    );
  };

  // Function to render daily workouts bar chart
  const renderDailyWorkoutsChart = () => {
    if (!data || activeTab !== 'thisWeek') return null;

    const dailyCounts = data.thisWeek.dailyWorkoutCount || [0, 0, 0, 0, 0, 0, 0]; // Default to zero if no data

    const chartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Workouts Completed',
          data: dailyCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    return (
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Daily Workouts This Week</Card.Title>
          <Bar data={chartData} options={{ responsive: true }} />
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Your Progress</h2>

      {/* Display streak information */}
      {!loading && data && (
        <div className="text-center">
          <h4>Current Streak: {data.streak} days</h4>
        </div>
      )}

      {/* Loader */}
      {loading ? <Loader /> : null}

      {/* Toggle buttons for weekly, monthly, yearly */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant={activeTab === 'thisWeek' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('thisWeek')}
        >
          Weekly Stats
        </Button>
        <Button
          variant={activeTab === 'thisMonth' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('thisMonth')}
          className="mx-2"
        >
          Monthly Stats
        </Button>
        <Button
          variant={activeTab === 'thisYear' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('thisYear')}
        >
          Yearly Stats
        </Button>
      </div>

      {/* Display the statistics */}
      {data && renderStatistics()}

      {/* Render the daily workouts chart */}
      {renderDailyWorkoutsChart()}
    </Container>
  );
};

export default ProgressCharts;
