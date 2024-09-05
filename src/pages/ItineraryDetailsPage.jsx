import {useState, useEffect} from "react";
import{Link, useParams} from "react-router-dom";
import AddDestination from "../components/AddDestination";
import DestinationCard from "../components/DestinationCard";
import itinerariesService from "../services/itineraries.service";

function ItineraryDetailsPage(props){

    const [itinerary , setItinerary] = useState(null);
    const { itineraryId } = useParams();

    const getItinerary = () => {

      itinerariesService.getItinerary(itineraryId)    
      .then((response) => {
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
          <p>{itinerary.destination}</p>
        </>
      )}

      
      <AddDestination refreshItineraryt={getItinerary} itineraryId={itineraryId} />          

      { itinerary && itinerary.destinations.map((destination) => <DestinationCard key={destination._id} {...destination} /> )} 

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