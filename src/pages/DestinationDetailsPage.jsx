import {useState, useEffect} from "react";
import{Link, useParams} from "react-router-dom";
import destinationsService from "../services/destinations.service";
import "/src/details.css"

function DestinationDetailsPage(){

    const [destination, setDestination] = useState(null);
    const { destinationId } = useParams();


    const getDestination = () => {

      destinationsService.getDestination(destinationId)    
      .then((response) => {
        console.log("Fetched destination: ", response.data);
        const oneDestination = response.data;
        setDestination(oneDestination);
      })
      .catch((error) => console.log(error));
    };

    useEffect(() => {
        getDestination();
    }, [destinationId]);

    return (
        <div className="DestinationDetails">
        {destination ? ( 
            <>
                <h2>{destination.location}</h2>
                
                <img src={destination.imageUrl} alt={destination.location} />
                <div className="description-container">
                <p>{destination.description}</p>
                </div>
                <div className="itineraries">
                    <h3>Associated Itineraries:</h3>
                    {destination.itineraries && destination.itineraries.length > 0 ? (
                        <ul>
                            {destination.itineraries.map((itinerary) => (
                                <li key={itinerary._id}>
                                    <Link to={`/itineraries/${itinerary._id}`}>
                                        {itinerary.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No itineraries associated with this destination.</p>
                    )}
                </div>
            </>
        ) : (
            <p>Loading destination details...</p> 
        )}

    
      <Link to="/destinations">
        <button>Back to Destinations</button>
      </Link>
          
      
    </div>
    );

}

export default DestinationDetailsPage;