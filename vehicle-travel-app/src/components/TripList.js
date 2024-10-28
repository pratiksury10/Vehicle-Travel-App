import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await axios.get('/api/trips');
      setTrips(response.data);
    };
    fetchTrips();
  }, []);

  return (
    <div>
      <h2>Trip List</h2>
      <ul>
        {trips.map(trip => (
          <li key={trip.id}>{trip.name} - {trip.distance} km</li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;