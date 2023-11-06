import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressLineChart = () => {
  // Data for the line chart
  const data = [
    { quarter: 'Q1', progress: 75 },
    { quarter: 'Q2', progress: 82 },
    { quarter: 'Q3', progress: 90 },
    { quarter: 'Q4', progress: 95 },
  ];

  return (
    <div>
      <h2>Completion Progress Over Four Business Quarters</h2>
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
