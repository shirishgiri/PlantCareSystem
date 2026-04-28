import React, { useState } from 'react';
import './UploadPredict.css';
import API from "../../api.jsx";

function Prediction() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setPrediction(null);
        }
    };

    const handlePredict = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await API.post('predict/', formData);
            setPrediction(response.data);
        } catch (error) {
            console.error("Prediction failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="predictor-container">
            <h2>Plant Care</h2>
            <p className="subtitle">Upload an image to identify the disease and get a solution</p>
            
            <div className="file-upload-wrapper">
                <input 
                    type="file" 
                    id="file-upload"
                    accept="image/*" 
                    onChange={onFileChange} 
                    className="hidden-input"
                />
                <label htmlFor="file-upload" className="custom-file-label">
                    {selectedFile ? 'Change Image' : 'Click to select image'}
                </label>
            </div>

            {preview && (
                <div className="image-preview-container">
                    <img src={preview} alt="Preview" className="image-preview" />
                </div>
            )}

            <button 
                onClick={handlePredict} 
                className="predict-button"
                disabled={!selectedFile || loading}
            >
                {loading ? "Analyzing Leaf..." : "Run Prediction"}
            </button>
            
            {prediction && (
                <div className="results-card">
                    <div className="result-header">
                        <h3>{prediction.class_name}</h3>
                        <p className="confidence-text">
                            {(prediction.confidence * 100).toFixed(1)}% Certainty
                        </p>
                    </div>

                    <div className="confidence-bar-bg">
                        <div 
                            className="confidence-bar-fill" 
                            style={{ width: `${prediction.confidence * 100}%` }}
                        ></div>
                    </div>

                    { }
                    <div className="solution-section">
                        <h4>Recommended Solution:</h4>
                        <div className="solution-text">
                            { }
                            {prediction.solution.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Prediction;