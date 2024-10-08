
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import itinerariesService from "../services/itineraries.service";
import destinationsService from "../services/destinations.service";
import React from "react";
import Select from 'react-select';
import { Link } from "react-router-dom";
import "/src/Update.css";



function UpdateItineraryPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [options, setOptions] = useState([]);
    const [inputFields, setInputFields] = useState([{ name: "" }]);

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

                setInputFields(
                    oneItinerary.details.length > 0
                        ? oneItinerary.details.map((detail) => ({ name: detail }))
                        : [{ name: "" }]
                );
            })
            .catch((error) => console.log(error));

    }, [itineraryId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedDestinations = destinations.map((dest) => dest.value);
        const itineraries = inputFields.map((field) => field.name);
        const requestBody = { title, description, destinations: selectedDestinations, details: itineraries };



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

    const handleFormChange = (index, event) => {
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };

    const addFields = () => {
        setInputFields([...inputFields, { name: "" }]);
    };

    const removeFields = (index) => {
        const data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
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
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Edit Itineraries:</label>
                <div className="itinerary-input-section">

                {inputFields.map((input, index) => (
                    <div key={index} className="itinerary-input-row">
                        <input
                            name="name"
                            placeholder="Itinerary Name"
                            value={input.name}
                            onChange={(event) => handleFormChange(index, event)}
                        />
                        <button
                            type="button"
                            className="button-action button-remove"
                            onClick={() => removeFields(index)}
                        >
                            x
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="button-action button-add"
                    onClick={addFields}
                >
                    +
                </button>
                </div>

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
                    styles={{
                        control: (base) => ({
                            ...base,
                            border: '2px solid #00c6ff',
                            borderRadius: '5px',
                            padding: '10px',
                            fontSize: '18px',
                            marginBottom: '15px',
                            boxShadow: 'none',
                            '&:hover': { borderColor: '#0072ff' },
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: '#888',
                            fontSize: '16px',
                        }),
                        multiValue: (base) => ({
                            ...base,
                            backgroundColor: '#e0f7ff',
                            borderRadius: '4px',
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            color: '#474849',
                        }),
                        multiValueRemove: (base) => ({
                            ...base,
                            color: '#ff0000',
                            ':hover': {
                                backgroundColor: '#ffcccc',
                                color: '#ff0000',
                            },
                        }),
                        menu: (base) => ({
                            ...base,
                            borderRadius: '5px',
                            marginTop: '5px',
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#0072ff' : '#fff',
                            color: state.isSelected ? '#fff' : '#333',
                            '&:hover': { backgroundColor: '#f0f0f0', color: '#0072ff' },
                        }),
                    }}
                />
                <div class="button-container">
                <Link to="/itineraries">
                    <button className="Back">Back to Itineraries</button>
                </Link>
                    <div className="Update"> 
                <button  type="submit">Update Itinerary</button>
                </div>
                </div>
            </form>

            

            <button className="Delete" onClick={deleteItinerary}>Delete Itinerary</button>
        </div>
    );
}

export default UpdateItineraryPage;