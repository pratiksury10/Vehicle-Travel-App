// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './DisplayDetails.css';

// const DisplayDetails = () => {
//   const location = useLocation();
//   const { tripData } = location.state || { tripData: [] };

//   return (
//     <div className="display-details-container">
//       <header>
//         <h1>Uploaded Trip Details</h1>
//       </header>
//       <main>
//         {tripData.length > 0 ? (
//           <table className="trip-table">
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Point</th>
//                 <th>Ignition</th>
//                 <th>Speed</th>
//                 <th>Travel Duration</th>
//                 <th>Stopped From</th>
//                 <th>Distance</th>
//                 <th>Over Speeding Duration</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tripData.map((trip, index) => (
//                 <tr key={index}>
//                   <td>{trip.time}</td>
//                   <td>{trip.point}</td>
//                   <td>{trip.ignition}</td>
//                   <td>{trip.speed}</td>
//                   <td>{trip.travelDuration}</td>
//                   <td>{trip.stoppedFrom}</td>
//                   <td>{trip.distance}</td>
//                   <td>{trip.overSpeedingDuration}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No trip data available</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default DisplayDetails;


import React from 'react';
import { useLocation } from 'react-router-dom';
import './DisplayDetails.css';

const DisplayDetails = () => {
  const location = useLocation();
  const { tripData } = location.state || { tripData: [] };

  return (
    <div className="display-details-container">
      <header>
        <h1>Uploaded Trip Details</h1>
      </header>
      <main>
        {tripData.length > 0 ? (
          <table className="trip-table">
            <thead>
              <tr>
                {Object.keys(tripData[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tripData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No trip data available</p>
        )}
      </main>
    </div>
  );
};

export default DisplayDetails;
