import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressLineChart = () => {
  // Data for the line chart
  const data = [
    { quarter: 'Q1', progress: 35 },
    { quarter: 'Q2', progress: 42 },
    { quarter: 'Q3', progress: 50 },
    { quarter: 'Q4', progress: 65 },
  ];

  return (
    <div>
      <h2>Completion Rates by Quarter</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="quarter" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="progress" name="Completion Progress" stroke="blue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressLineChart;
