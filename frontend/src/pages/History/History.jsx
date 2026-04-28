import React, { useState, useEffect } from 'react';
import API from "../../api.jsx";
import './History.css';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await API.get('history/', {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` }
                });
                setHistory(response.data);
            } catch (err) {
                console.error("Failed to fetch history", err);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="history-container">
            <h2 className="history-title">My Prediction History</h2>
            <div className="history-list">
                {history.length > 0 ? history.map((item) => (
                    <div key={item.id} className="history-item">
                        <div className="history-info">
                            <span className="history-disease">{item.disease_name}</span>
                            <span className="history-date">{item.date}</span>
                        </div>
                        <div className="history-stat">
                            <span className="history-confidence">{(item.confidence * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                )) : <p>No history found. Start scanning your plants!</p>}
            </div>
        </div>
    );
}

export default History;