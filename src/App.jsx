import './index.css';
import { Routes, Route } from "react-router-dom";
import HomePage from '/src/pages/HomePage.jsx';
import ItineraryListPage from './pages/ItineraryListPage';
import ItineraryDetailsPage from './pages/ItineraryDetailsPage';
import DestinationListPage from './pages/DestinationListPage';
import DestinationDetailsPage from './pages/DestinationDetailsPage';
import UpdateItineraryPage from './pages/UpdateItineraryPage';
import IsPrivate from './components/isPrivate';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';

function App() {

  return (

    <div className="App">
      <h1>Tour It</h1>
      <Navbar />
      <Routes>
        <Route path="/itineraries" element={<ItineraryListPage />} />

        <Route path="/itineraries/:itineraryId" element={ <ItineraryDetailsPage /> } />

        <Route path="/destinations" element={<DestinationListPage />} />

        <Route path="/destinations/:destinationId" element={<DestinationDetailsPage />} />

        <Route path="/itineraries/edit/:itineraryId" element={<UpdateItineraryPage />} />

        <Route exact path="/" element={<HomePage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/login" element={<LoginPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App
