import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import AvengersLogo from './images/Avengers.jpg';
import Direction from './images/Direction.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to store uploaded image
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/protected-route', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch protected data');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProtectedData();
  }, []);

  const handleUploadClick = () => {
    navigate('/display-image');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveClick = () => {
    navigate('/display-image', { state: { imageSrc: uploadedImage } });
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <img src={AvengersLogo} className="dashboard-logo" alt="Speedo Logo" />
        <p className='Speed'>Speedo</p>
      </header>
      <main className="dashboard-main">
        <div className="welcome-message">
          <span role="img" aria-label="waving hand">👋</span> Welcome, User
        </div>
        <div className="upload-section">
          <img src={uploadedImage || Direction} alt="Map Illustration" className="map-illustration" />
          <button className="upload-button" onClick={handleUploadClick}>Upload Trip</button>
          <p className="upload-instruction">Upload the <a href="#">Excel</a> sheet of your trip</p>
        </div>
      </main>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Upload Trip</h2>
            <label htmlFor="tripName">Trip Name*</label>
            <input type="text" id="tripName" name="tripName" required />
            <label htmlFor="tripFile">Upload Excel Sheet</label>
            <input type="file" id="tripFile" name="tripFile" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
            <button onClick={handleModalClose}>Cancel</button>
            <button onClick={handleSaveClick}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
