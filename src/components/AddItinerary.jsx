import { useState } from "react";
import itinerariesService from "../services/itineraries.service";


    function AddItinerary(props) {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [destination, setDestination] = useState("");
    
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, destination };
    
        console.log("Submitting: ", requestBody);
    
        itinerariesService.createItinerary(requestBody)
          .then((response) => {
            console.log("Response: ", response);
            setTitle("");
            setDescription("");
            setDestination("");
            props.refreshItineraries();
          })
          .catch((error) => console.log(error));
      };
    
    
      return (
        <div className="AddItinerary">
          <h3>Add Itinerary</h3>
    
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter the Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
    
            <label>Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Destination:</label>
            <input
              type="text"
              name="destination"
              placeholder="Enter Destination"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
    
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
    

export default AddItinerary;