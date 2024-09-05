import { Link } from "react-router-dom";


 function DestinationCard( { location, description, imageUrl, _id } ) {

     return (
            <div className="DestinationCard card">
                <Link to={`/destinations/${_id}`}>
                    <h3>{location}</h3>
                </Link>
                <p style={{ maxWidth: "400px" }}>{description} </p>
                <img src={imageUrl}/>
            </div>
        );
    }

export default DestinationCard;