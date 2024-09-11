import './index.css';
import './HomePage.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/Homepage';
import ItineraryListPage from './pages/ItineraryListPage';
import ItineraryDetailsPage from './pages/ItineraryDetailsPage';
import DestinationListPage from './pages/DestinationListPage';
import DestinationDetailsPage from './pages/DestinationDetailsPage';
import UpdateItineraryPage from './pages/UpdateItineraryPage';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/isAnon';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (

    <div className="App">
      <h1>Tour It</h1>
      <Navbar />
      <Routes>
        <Route path="/itineraries" element={<ItineraryListPage />} />

        <Route path="/itineraries/:itineraryId" element={ <IsPrivate> <ItineraryDetailsPage /> </IsPrivate>} />

        <Route path="/destinations" element={<IsPrivate> <DestinationListPage /> </IsPrivate>} />

        <Route path="/destinations/:destinationId" element={ <IsPrivate> <DestinationDetailsPage /> </IsPrivate> } />

        <Route path="/itineraries/edit/:itineraryId" element={ <IsPrivate> <UpdateItineraryPage /> </IsPrivate>} />

        <Route exact path="/" element={<HomePage />} />

        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />

        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App
