import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ROIChart = () => {
  const data = [
    { quarter: 'Q1', costSaved: 3.1 },
    { quarter: 'Q2', costSaved: 2.5 },
    { quarter: 'Q3', costSaved: 2.8 },
    { quarter: 'Q4', costSaved: 3.3 },
  ];

  return (
    <div>
      <h2>ROI Bar (Cost Saved)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="costSaved" fill="#8884d8" name="Cost Saved (in millions)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ROIChart;
