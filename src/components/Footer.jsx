import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <p>
          <Link to="/">
            <img src="/images/homebutton.png" width="40" height="auto" alt="Home Button" />
          </Link>
          <a href="https://github.com/tour-it-planner">
            <img src="/images/github-mark-white.png" width="30" height="auto" alt="GitHub" />
          </a>
        </p>
        <p>&copy; 2024 Tour It - All rights reserved</p>
      </footer>
    </div>
  );
}


export default Footer;