import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import itinerariesService from "../services/itineraries.service";
import moment from "moment";
import "/src/details.css"

function ItineraryDetailsPage() {

  const [itinerary, setItinerary] = useState(null);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);
  const { itineraryId } = useParams();


  const getItinerary = () => {

    itinerariesService.getItinerary(itineraryId)
      .then((response) => {
        const oneItinerary = response.data;

        // calc formatted date
        
        const formattedResult = oneItinerary ? moment(oneItinerary.createdAt).format('DD MMMM YYYY') : '';
        
        // update state
        setFormattedCreatedAt(formattedResult);
        setItinerary(oneItinerary);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getItinerary();
  }, [itineraryId]);


  return (
    <div className="ItineraryDetails">
      {itinerary && (
        <>
          <h2>{itinerary.title}</h2>

          <div className="description-container">
          <p>{itinerary.description}</p>
        </div>
        
          <ul>
            {itinerary.details.map((e) => {
              return(<li key={"details-each"}>{e}</li>)
            })}
          </ul>

          <div className="destination-details">
            {itinerary.destinations && itinerary.destinations.length > 0 ? (
              itinerary.destinations.map((dest) => (
                <DestinationCard key={dest._id} {...dest} />
              ))
            ) : (
              <p> No destination selected for this itinerary.</p>
            )}
          </div>
            <p>Created on: {formattedCreatedAt}</p>
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