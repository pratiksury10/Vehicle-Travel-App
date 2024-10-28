import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Upload from './components/Upload';
import TripList from './components/TripList';
import UploadTripData from './UploadTripData';
import Login from './components/Login';
import UserLogin from './components/UserLogin';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import DisplayImage from './DisplayImage';
import TripManager from './TripManager';
import DisplayDetails from './DisplayDetails';
import ImageDetail from './ImageDetails';
import ImageUpload from './ImageUpload';
// import DisplayImagePage from './DisplayImagePage';

const App = () => {
  const tripData = [
    { destination: 'Tokyo', date: '2023-05-01', description: 'Sightseeing in Tokyo' },
    { destination: 'Kyoto', date: '2023-05-03', description: 'Exploring temples' }
  ];

  const imageData = {
    imageUrl: 'Location.jpg',  
    description: 'A beautiful scenery with mountains and a river.',
    title: 'Mountain River'
  };

  return (
    <div>

      {/* <Login /> */}
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/display-image" element={<DisplayImage />} />
        <Route path="/trip-manager" element={<TripManager />} />
        <Route path="/display" element={<DisplayDetails />} />
        <Route path="/details" render={(props) => <DisplayDetails {...props} tripData={tripData} />} />
        <Route path="/image" render={(props) => <ImageDetail {...props} {...imageData} />} />
        <Route path="/upload-image" element={<ImageUpload />} />
        {/* <Route path="/display" element={<DisplayImagePage />} /> */}
      </Routes>
  
      
      {/* <h1>Vehicle Travel Tracker</h1>
      <Upload />
      <TripList />
      <UploadTripData /> */}
      {/* Include the Map component with positions prop */}
    </div>
  );
};

export default App;
