import { useState, useEffect } from "react";
import itinerariesService from "../services/itineraries.service";
import destinationsService from "../services/destinations.service";
import React from "react";
import Select from 'react-select'


    function AddItinerary(props) {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [destination, setDestination] = useState([]);
      const [options, setOptions] = useState([]);

      useEffect(() => {
        const fetchDestinations = () => {
          destinationsService.getAllDestinations()
            .then((response) => {
              console.log("Fetched Destinations: ", response.data);
              const formattedOptions = response.data.map((destination) => ({
                value: destination._id, 
                label: destination.location,
              }));
              setOptions(formattedOptions);
            })
            .catch((error) => console.log("Error getting destination options", error));
        };
    
        fetchDestinations();
      }, []);


      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected Destinations before submitting: ", destination);
        const selectedDestinations = destination.map((dest) => dest.value);
        const requestBody = { title, description, destinations: selectedDestinations };
    
        console.log("Submitting: ", requestBody);
        console.log("Submitting: ", requestBody); 
    
        itinerariesService.createItinerary(requestBody)
          .then((response) => {
            
            setTitle("");
            setDescription("");
            setDestination([]);
            props.refreshItineraries(response.data);
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
            <Select
              isMulti
              type="text"
              name="destination"
              placeholder="Select Destination(s)"
              required
              options={options}
              value={destination}
              onChange={(selectedOptions) => {
                console.log("Selected Options: ", selectedOptions);  
                setDestination(selectedOptions ? selectedOptions : []);  
              }}
            />
    
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
    

export default AddItinerary;