import {useState, useEffect} from "react";
import{Link, useParams} from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import itinerariesService from "../services/itineraries.service";

function ItineraryDetailsPage(){

    const [itinerary , setItinerary] = useState(null);
    const { itineraryId } = useParams();


    const getItinerary = () => {

      itinerariesService.getItinerary(itineraryId)    
      .then((response) => {
        console.log("Fetched itinerary: ", response.data);
        const oneItinerary = response.data;
        setItinerary(oneItinerary);
      })
      .catch((error) => console.log(error));
    };

    useEffect(() => {
        getItinerary();
    }, []);

    return (
        <div className="ItineraryDetails">
      {itinerary && (
        <>
          <h2>{itinerary.title}</h2>
          <p>{itinerary.description}</p>
          <div className="destination-details">
            {itinerary.destinations && itinerary.destinations.length > 0 ? (
              itinerary.destinations.map((dest) => (
                <DestinationCard key={dest._id} {...dest} />
              ))
            ) : (
              <p>No destination selected for this itinerary.</p>
            )}
          </div>
        </>
      )}

    
      <Link to="/itineraries">
        <button>Back to Itineraries</button>
      </Link>
          
      <Link to={`/itineraries/edit/${itineraryId}`}>
        <button>Edit Itinerary</button>
      </Link>
      
    </div>
    );

}

export default ItineraryDetailsPage;