import React, { useState, useEffect } from 'react';
import './Solutions.css';
import API from "../../api.jsx";

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await API.get('solutions/'); 
        setSolutions(response.data);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };
    fetchSolutions();
  }, []);

  return (
    <div className='solutions-container'>
      <h1 className="solutions-title">Plant Care Solutions</h1>
      <div className='solutions-grid'>
        {solutions.map((item, index) => (
          <div key={index} className='solution-card'>
            <h3 className='disease-name'>{item.name}</h3>
            <div className='disease-solution'>
              {item.solution.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;