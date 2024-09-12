import { useState } from "react";
import destinationsService from "../services/destinations.service";
import "/src/add.css";

function AddDestination(props) {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const { itineraryId } = props;
    const requestBody = { location, description, imageUrl, itineraryId };


    destinationsService.createDestination(requestBody)
      .then((response) => {
        setLocation("");
        setDescription("");
        setImageUrl("");
        props.refreshDestinations(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddDestination">
      <h3>Add Destination</h3>

      <form onSubmit={handleSubmit}>
        <label>Location: </label>
        <input
          type="text"
          name="title"
          placeholder="Enter Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Description: </label>
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         <label>Image: </label>
        <input
          type="link"
          name="imageUrl"
          placeholder="Enter Image Url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddDestination;