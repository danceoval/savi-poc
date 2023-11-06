import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const UseCaseChart = () => {
  const data = [
    { name: 'Data Gathering', value: 41 },
    { name: 'Data Analysis', value: 28 },
    { name: 'Data Generation', value: 31 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div>
      <h2>Top Use-Cases</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UseCaseChart;
