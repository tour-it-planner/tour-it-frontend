import { Link } from "react-router-dom";

function Footer() {
    
    return (
        <footer className="footer">
        <p> <Link to="/"><img src= "/images/homebutton.png" width="40" height="auto" align="center" />  </Link>   <Link to="https://github.com/tour-it-planner"> <img src= "/images/github-mark-white.png" width="30" height="auto" align="center" /></Link></p>
        <p>&copy; 2024 Tour It - All rights reserved </p>
      </footer>
    );

}

export default Footer;