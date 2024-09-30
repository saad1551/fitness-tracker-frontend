import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Loader from '../Components/Loader';
import { toast } from 'react-toastify';

const ProgressCharts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('thisWeek'); // 'thisWeek', 'thisMonth', 'thisYear'

  // Fetch data from the backend
  useEffect(() => {
    const backendUrl = "http://localhost:5000";
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
        {/* <Col>
          <Card>
            <Card.Body>
              <Card.Title>Time Spent (Hours)</Card.Title>
              <Card.Text>{stats.timeSpent.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
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
    </Container>
  );
};

export default ProgressCharts;
