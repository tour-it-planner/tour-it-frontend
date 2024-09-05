import { Link } from "react-router-dom";

function ItineraryCard( { title, description, _id } ) {

    return (
        <div className="ItineraryCard">
            <Link to={`/itineraries/${_id}`}>
                <h3>{title}</h3>
            </Link>
             <p style={{ maxWidth: "400px" }}>{description} </p>
        </div>
    )
}

export default ItineraryCard;