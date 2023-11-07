import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressLineChart from './ProgressLineChart';
import UseCaseChart from './UseCaseChart';
import ROIChart from './ROIChart';

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState('progress');

  const renderChart = () => {
    switch (selectedChart) {
      case 'progress':
        return <ProgressLineChart />;
      case 'use-cases':
        return <UseCaseChart />;
      case 'roi':
        return <ROIChart />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <nav>
        <div className="nav-menu">
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </nav>
      <h1>Data Visualization Dashboard</h1>

      <div className="nav-menu">
        <div
          className={`nav-item ${selectedChart === 'progress' ? 'active' : ''}`}
          onClick={() => setSelectedChart('progress')}
        >
          Progress Chart
        </div>
        <div
          className={`nav-item ${selectedChart === 'use-cases' ? 'active' : ''}`}
          onClick={() => setSelectedChart('use-cases')}
        >
          Use Cases
        </div>
        <div
          className={`nav-item ${selectedChart === 'roi' ? 'active' : ''}`}
          onClick={() => setSelectedChart('roi')}
        >
          ROI
        </div>
      </div>

      {renderChart()}
    </div>
  );
};

export default Dashboard;
