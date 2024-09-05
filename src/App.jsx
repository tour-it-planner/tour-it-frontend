import './index.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';
import ItineraryListPage from './pages/ItineraryListPage';
import ItineraryDetailsPage from './pages/ItineraryDetailsPage';
import DestinationListPage from './pages/DestinationListPage';
import UpdateItineraryPage from './pages/UpdateItineraryPage';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (

    <div className="App">
      <h1>Tour It</h1>
      <Navbar/>
      <Routes>
      <Route
          path="/itineraries"
          element={  <ItineraryListPage />  } 
        />

      <Route
          path="/itineraries/:itineraryId"
          element={ <ItineraryDetailsPage /> }
        />
        <Route
          path="/destinations"
          element={  <DestinationListPage />  } 
        />

        <Route
          path="/itineraries/edit/:itineraryId"
          element={  <UpdateItineraryPage />  } 
        />
      <Route exact path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      </Routes>
    </div>
  );
}

export default App
