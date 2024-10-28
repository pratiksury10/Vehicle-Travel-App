import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TripManager.css';

const TripManager = () => {
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
  const [uploadedImage, setUploadedImage] = useState(null);
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
    console.log('Opening trips:', selectedTrips);
  };

  const handleUploadClick = () => {
    navigate('/display', { state: { imageSrc: uploadedImage } });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="trip-manager">
      <header>
        <h1>Speedo</h1>
      </header>
      <main>
        <section className="welcome-section">
          <h2>👋 Welcome, User</h2>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadClick}>Upload Trip</button>
          <p>Upload the <a href="#">Excel</a> sheet of your trip</p>
         // Add a new section to display the uploaded image details
          <section className="image-details">
            <h3>Image Details:</h3>
            {uploadedImage && (
              <ul>
                <li>Image width: {getImageWidth(uploadedImage)}px</li>
                <li>Image height: {getImageHeight(uploadedImage)}px</li>
                <li>Image format: {getImageFormat(uploadedImage)}</li>
              </ul>
            )}
          </section>
        </section>
        <section className="trips-section">
          <h3>Your Trips</h3>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedTrips(
                        e.target.checked ? trips : []
                      )
                    }
                    checked={selectedTrips.length === trips.length}
                  />
                </th>
                <th>Trips</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleSelectTrip(trip)}
                      checked={selectedTrips.includes(trip)}
                    />
                  </td>
                  <td>{trip}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="buttons">
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleOpen}>Open</button>
          </div>
        </section>
        <footer>
          <nav>
            <ul>
              <li><button>1</button></li>
              <li><button>2</button></li>
              <li><button>3</button></li>
              <li><button>4</button></li>
              <li><button>5</button></li>
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  );
};

// Add three new functions to extract image details
const getImageWidth = (imageSrc) => {
  // TO DO: Implement logic to extract image width from imageSrc
  return 1024; // dummy value
};

const getImageHeight = (imageSrc) => {
  // TO DO: Implement logic to extract image height from imageSrc
  return 768; // dummy value
};

const getImageFormat = (imageSrc) => {
  // TO DO: Implement logic to extract image format from imageSrc
  return 'JPEG'; // dummy value
};

export default TripManager;