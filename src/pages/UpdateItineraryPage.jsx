
    import { useState, useEffect } from "react";
    import { useNavigate, useParams } from 'react-router-dom';
    import itinerariesService from "../services/itineraries.service";
    import { Link } from "react-router-dom";

    
    
    function UpdateItineraryPage(props) {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [destination, setDestination] = useState("");
    
      const navigate =  useNavigate();
      const { itineraryId } = useParams();
      
      
      useEffect(() => {
       
    
        itinerariesService.getItinerary(itineraryId)
          .then((response) => {
            const oneItinerary = response.data;
            setTitle(oneItinerary.title);
            setDescription(oneItinerary.description);
            setDestination(oneItinerary.destination);
          })
          .catch((error) => console.log(error));
        
      }, [itineraryId]);
      
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, destination };
    
        
        
        itinerariesService.updateItinerary(itineraryId, requestBody)    
          .then((response) => {
            navigate(`/itineraries/${itineraryId}`)
          });
      };
      
      
      const deleteItinerary = () => {
    
        
        itinerariesService.deleteItinerary(itineraryId)        
          .then(() => navigate("/itineraries"))
          .catch((err) => console.log(err));
      };  
    
      
      return (
        <div className="EditItineraryPage">
          <h3>Edit the Itinerary</h3>
    
          <form onSubmit={handleFormSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <label>Description:</label>
            <input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Destination:</label>
            <input
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
    
            <button type="submit">Update Itinerary</button>
          </form>
    
          <button onClick={deleteItinerary}>Delete Itinerary</button>
        </div>
      );
    }

export default UpdateItineraryPage;