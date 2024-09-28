import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Dashboard() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        Tab content for Home
      </Tab>
      <Tab eventKey="workout_history" title="Workout History">
        Tab content for Workout History
      </Tab>
      <Tab eventKey="progress_charts" title="Progress Charts">
        Tab content for Progress Charts
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
}

export default Dashboard;