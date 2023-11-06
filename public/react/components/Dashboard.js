import React from 'react';
import ProgressLineChart from './ProgressLineChart';
import UseCaseChart from './UseCaseChart';
import ROIChart from './ROIChart';

const Dashboard = () => {
  return (
    <div>
      <h2>Progress Tracking</h2>
      <ProgressLineChart  />
      <h2>Use Cases</h2>
      <UseCaseChart  />
      <h2>ROI</h2>
      <ROIChart  />
    </div>
  );
};

export default Dashboard;
