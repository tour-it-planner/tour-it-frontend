import axios from "axios";

class DestinationsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/destinations
  createDestination = (requestBody) => {
    return this.api.post("/api/destinations", requestBody);
  };

  // GET /api/destinations
  getAllDestinations = () => {
    return this.api.get("/api/destinations");
  };

  // GET /api/destinations/:id
  getDestination = (id) => {
    return this.api.get(`/api/destinations/${id}`);
  };


}

// Create one instance (object) of the service
const destinationsService = new DestinationsService();

export default destinationsService;