import React, { useState, useEffect } from 'react';


export const ProgressBar = ({ percentage }) => {
  const [style, setStyle] = useState({ width: '0%' });

  useEffect(() => {
    // Update the progress bar when the percentage prop changes
    setStyle({ width: `${percentage}%` });
  }, [percentage]);

  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={style}>
        {percentage}%
      </div>
    </div>
  );
};
