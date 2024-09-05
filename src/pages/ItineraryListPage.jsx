import axios from "axios";
import { useState, useEffect } from "react";
import AddItinerary from "../components/AddItinerary";
import ItineraryCard from "../components/ItineraryCard";
import itinerariesService from "../services/itineraries.service";

const API_URL = "http://localhost:5005";

function ItineraryListPage() {

    const [itineraries, setItineraries] = useState([]);

    const getAllItineraries = () => {

        itinerariesService
        .getAllItineraries()
        .then((response) => setItineraries(response.data))
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllItineraries();
    }, []);

    return (
        <div className="ItineraryListPage">
            <AddItinerary refreshItineraries={getAllItineraries} />
            {itineraries.map((itinerary) => {
               return <ItineraryCard key={itinerary._id} {...itinerary} />
            })}
        </div>
    )

}

export default ItineraryListPage;