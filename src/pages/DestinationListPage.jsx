import destinationsService from "../services/destinations.service";
import DestinationCard from "../components/DestinationCard";
import AddDestination from "../components/AddDestination";
import { useState, useEffect } from "react";


const API_URL = "http://localhost:5005";

function DestinationListPage() {

    const [destinations, setDestinations] = useState([]);

    const getAllDestinations = () => {
        
        destinationsService
        .getAllDestinations()
        .then((response) => setDestinations(response.data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllDestinations();
    }, []);

    return (
        <div className="DestinationsListPage">
            <AddDestination refreshDestinations={getAllDestinations} />
            {destinations.map((destination) => {
                return <DestinationCard key={destination._id} {...destination} />
            })}
        </div>
    )

}

export default DestinationListPage;