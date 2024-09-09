
import { Link } from "react-router-dom";
import "/src/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
     
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Plan Your Next Adventure</h1>
          <p className="hero-subtitle">Organize, explore, and experience unforgettable journeys.</p>
          <Link to="/itineraries">
            <button className="cta-button">Start Planning</button>
          </Link>
        </div>
      </section>

    
      <section className="highlights-section">
        <h2>Why Plan With Us?</h2>
        <div className="highlights">
          <div className="highlight-card">
            <img src="https://images.pexels.com/photos/319930/pexels-photo-319930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Explore Destinations" />
            <h3>Explore Top Destinations</h3>
            <p>Browse hundreds of european destinations, created by fellow travelers.</p>
          </div>
          <div className="highlight-card">
            <img src="https://images.pexels.com/photos/7368300/pexels-photo-7368300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Plan Efficiently" />
            <h3>Efficient Planning</h3>
            <p>Create, organize, and customize your itineraries effortlessly.</p>
          </div>
          <div className="highlight-card">
            <img src="https://images.pexels.com/photos/15527947/pexels-photo-15527947/free-photo-of-banco-assento-tribunal-panorama.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Connect with Travelers" />
            <h3>Connect with Travelers</h3>
            <p>Share your experiences, reviews, and tips with a global community.</p>
          </div>
        </div>
      </section>

      
      <section className="inspiration-section">
        <h2>Inspiration for Your Next Trip</h2>
        <div className="inspiration-images">
          <img src="https://images.pexels.com/photos/27684927/pexels-photo-27684927/free-photo-of-mar-panorama-vista-paisagem.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Beach" />
          <img src="https://images.pexels.com/photos/27979609/pexels-photo-27979609/free-photo-of-a-view-of-the-mountains-at-night-with-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  alt="Mountains" />
          <img src="https://images.pexels.com/photos/17350906/pexels-photo-17350906/free-photo-of-view-of-a-bridge-in-paris-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="City" />
          <img src="https://images.pexels.com/photos/2527556/pexels-photo-2527556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Forest" />
        </div>
      </section>

      
      <footer className="footer">
        <p>&copy; 2024 Travel Planner | <Link to="/about">About Us</Link> | <Link to="/contact">Contact Us</Link></p>
      </footer>
    </div>
  );
}

export default HomePage;