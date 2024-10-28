import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvengersLogo from './images/Avengers.jpg';
import './DisplayImage.css';
import Papa from 'papaparse';

const DisplayImage = () => {
  const [trips, setTrips] = useState([
    'Mumbai - Pune',
    'Delhi - Agra',
    'Chennai - Pondicherry',
    'Hyderabad - Goa',
    'Kolkata - Darjeeling',
    'Ahmedabad - Udaipur',
    'Bhopal - Indore',
    'Chandigarh - Shimla',
    'Lucknow - Varanasi',
    'Jaipur - Jodhpur',
  ]);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [uploadedTrip, setUploadedTrip] = useState(null);
  const [tripData, setTripData] = useState([]);
  const navigate = useNavigate();

  const handleSelectTrip = (trip) => {
    setSelectedTrips((prevSelectedTrips) =>
      prevSelectedTrips.includes(trip)
        ? prevSelectedTrips.filter((t) => t !== trip)
        : [...prevSelectedTrips, trip]
    );
  };

  const handleDelete = () => {
    setTrips((prevTrips) =>
      prevTrips.filter((trip) => !selectedTrips.includes(trip))
    );
    setSelectedTrips([]);
  };

  const handleOpen = () => {
    if (selectedTrips.length > 0) {
      navigate('/display', { state: { tripData } });
    } else {
      alert('Please select a trip to open.');
    }
  };

  const handleUploadClick = () => {
    if (uploadedTrip) {
      Papa.parse(uploadedTrip, {
        complete: (results) => {
          setTripData(results.data);
          setTrips((prevTrips) => [...prevTrips, uploadedTrip.name]);
          setUploadedTrip(null); // Reset the uploaded trip after adding it to the list
        },
        header: true // Make sure to parse with headers
      });
    } else {
      alert('Please upload a trip file first.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedTrip(file);
  };

  return (
    <div className="trip-manager">
      <header className="dashboard-header">
        <img src={AvengersLogo} className="dashboard-logo" alt="Speedo Logo" />
        <p className='Speed'>Speedo</p>
      </header>
      <main>
      <h2 className="user"><span role="img" aria-label="waving hand">👋</span> Welcome, User</h2>
        <section className="welcome-section">
          <div className="excel1">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadClick} className="excel2">Upload Trip</button>
            <p>Upload the <a href="#">Excel</a> sheet of your trip</p>
          </div>
        </section>
        <section className="trips-section">
          <h3 className="trip1">Your Trips</h3>
          <table>
            <tbody className="table-column">
              {trips.map((trip, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleSelectTrip(trip)}
                      checked={selectedTrips.includes(trip)}
                    />
                  </td>
                  <td className="table-cell">{trip}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handleDelete} className="button13">Delete</button>
            <button onClick={handleOpen} className="button31">Open</button>
          </div>
        </section>
        <footer>
          <nav className="pagination">
            <ul>
              <li><button>&lt;</button></li>
              <li><button>1</button></li>
              <li><button>2</button></li>
              <li><button>3</button></li>
              <li><button>4</button></li>
              <li><button>5</button></li>
              <li><button>&gt;</button></li>
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  );
};

export default DisplayImage;
