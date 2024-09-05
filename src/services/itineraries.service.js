import axios from "axios";

class ItinerariesService {
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

  // POST /api/itineraries
  createItinerary = (requestBody) => {
    return this.api.post("/api/itineraries", requestBody);
  };

  // GET /api/itineraries
  getAllItineraries = () => {
    return this.api.get("/api/itineraries");
  };

  // GET /api/itineraries/:id
  getItinerary = (id) => {
    return this.api.get(`/api/itineraries/${id}`);
  };

  // PUT /api/itineraries/:id
  updateItinerary = (id, requestBody) => {
    return this.api.put(`/api/itineraries/${id}`, requestBody);
  };

  // DELETE /api/itineraries/:id
  deleteItinerary = (id) => {
    return this.api.delete(`/api/itineraries/${id}`);
  };
}


const itinerariesService = new ItinerariesService();

export default itinerariesService;
