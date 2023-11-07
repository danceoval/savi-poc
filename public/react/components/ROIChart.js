import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ROIChart = () => {
  const dataCost = [
    { quarter: 'Q1', costSaved: 1.1 },
    { quarter: 'Q2', costSaved: 1.8 },
    { quarter: 'Q3', costSaved: 2.7 },
    { quarter: 'Q4', costSaved: 2.3 },
  ];

  return (
    <div>
      <h2>Cost Saved by Quarter</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataCost}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="costSaved" fill="#8884d8" name="Cost Saved ($M)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ROIChart;
