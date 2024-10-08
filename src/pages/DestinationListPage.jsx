import destinationsService from "../services/destinations.service";
import DestinationCard from "../components/DestinationCard";
import AddDestination from "../components/AddDestination";
import { useState, useEffect } from "react";
import "/src/List.css"


function DestinationListPage() {

    const [destinations, setDestinations] = useState([]);
    const [showForm, setShowForm] = useState(false); 

    const getAllDestinations = () => {
        
        destinationsService
        .getAllDestinations()
        .then((response) => setDestinations(response.data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllDestinations();
    }, []);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const handleNewDestination = (newDestination) => {
        setDestinations((prevDestinations) => [newDestination, ...prevDestinations]);
        setShowForm(false); 
    };

    return (
        <div className="DestinationListPage">
            <button onClick={toggleFormVisibility} className="toggle-form-button">
                {showForm ? 'Cancel' : 'Add Destination'}
            </button>
            
            {showForm ? (
                <div className="AddButton">
                <AddDestination refreshDestinations={handleNewDestination} />
                </div>
            ) : (
                <div className="destination-cards">
                    {destinations.slice().reverse().map((destination) => (
                        <DestinationCard key={destination._id} {...destination} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default DestinationListPage;