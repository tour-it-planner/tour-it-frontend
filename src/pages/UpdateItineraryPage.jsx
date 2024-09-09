
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import itinerariesService from "../services/itineraries.service";
import destinationsService from "../services/destinations.service";
import React from "react";
import Select from 'react-select';
import { Link } from "react-router-dom";



function UpdateItineraryPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [options, setOptions] = useState([]);

    const navigate = useNavigate();
    const { itineraryId } = useParams();

    useEffect(() => {
        const fetchDestinations = () => {
            destinationsService.getAllDestinations()
                .then((response) => {

                    const formattedOptions = response.data.map((destinations) => ({
                        value: destinations._id,
                        label: destinations.location,
                    }));
                    setOptions(formattedOptions);
                })
                .catch((error) => console.log("Error getting destination options", error));
        };

        fetchDestinations();
    }, []);

    useEffect(() => {


        itinerariesService.getItinerary(itineraryId)
            .then((response) => {
                const oneItinerary = response.data;
                setTitle(oneItinerary.title);
                setDescription(oneItinerary.description);
                const selectedDestinations = oneItinerary.destinations.map(dest => ({
                    value: dest._id,
                    label: dest.location
                }));
                setDestinations(selectedDestinations);
            })
            .catch((error) => console.log(error));

    }, [itineraryId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedDestinations = destinations.map((dest) => dest.value);
        const requestBody = { title, description, destinations: selectedDestinations };



        itinerariesService.updateItinerary(itineraryId, requestBody)
            .then((response) => {
                navigate(`/itineraries/${itineraryId}`);
                setDestinations([]);
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
                <Select
                    isMulti
                    type="text"
                    name="destinations"
                    placeholder="Select Destination(s)"
                    options={options}
                    value={destinations}
                    onChange={(selectedOptions) => {
                    console.log("Selected Options: ", selectedOptions);  
                    setDestinations(selectedOptions ? selectedOptions : []);  
                    }}
                />

                <Link to="/itineraries">
                    <button>Back to Itineraries</button>
                </Link>

                <button type="submit">Update Itinerary</button>
            </form>

            <button onClick={deleteItinerary}>Delete Itinerary</button>
        </div>
    );
}

export default UpdateItineraryPage;