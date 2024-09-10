import { useState, useEffect , useContext} from "react";
import AddItinerary from "../components/AddItinerary";
import ItineraryCard from "../components/ItineraryCard";
import itinerariesService from "../services/itineraries.service";
import { AuthContext } from "../context/auth.context";


function ItineraryListPage() {
    const [itineraries, setItineraries] = useState([]);
    const [showForm, setShowForm] = useState(false); 
    const { isLoggedIn } = useContext(AuthContext); 

    const getAllItineraries = () => {
        itinerariesService
            .getAllItineraries()
            .then((response) => setItineraries(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllItineraries();
    }, []);


    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const handleNewItinerary = (newItinerary) => {
        setItineraries((prevItineraries) => [newItinerary, ...prevItineraries]);
        setShowForm(false); 
    };

    return (
        <div className="ItineraryListPage">
           {isLoggedIn && (
                <button onClick={toggleFormVisibility} className="toggle-form-button">
                    {showForm ? 'Cancel' : 'Add Itinerary'}
                </button>
            )}
            
            {showForm ? (
                <AddItinerary refreshItineraries={handleNewItinerary} />
            ) : (
                <div className="itinerary-cards">
                    {itineraries.map((itinerary) => (
                        <ItineraryCard key={itinerary._id} {...itinerary} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ItineraryListPage;