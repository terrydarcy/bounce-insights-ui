import axios from "axios";

export class ApiService {
  baseUrl: string;

  constructor() {
    console.log(process.env.REACT_APP_BASE_URL);
    this.baseUrl =
      process.env.REACT_APP_BASE_URL ||
      "http://127.0.0.1:5001/bounce-insights-ui/us-central1/bounce_insights_api";
  }

  async getAPOD() {
    try {
      const response = await axios.get(`${this.baseUrl}/nasa/apod`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching APOD data from bounce insights api");
    }
  }

  async getMarsWeather() {
    try {
      const response = await axios.get(`${this.baseUrl}/nasa/weather`);
      return response.data;
    } catch (error) {
      throw new Error(
        "Error fetching Mars weather data from bounce insights api"
      );
    }
  }

  async getRoverImagesForSol(sol: number, page: number, roverType: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/nasa/roverImagesForSol?sol=${sol}&page=${page}&rover_type=${roverType}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        "Error fetching rover images for sol data from bounce insights api"
      );
    }
  }

  async getRoverImagesForEarthDate(
    date: Date,
    page: number,
    roverType: string
  ) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/nasa/roverImagesForEarthDate?earth_date=${date}&page=${page}&rover_type=${roverType}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        "Error fetching rover images for earth date data from bounce insights api"
      );
    }
  }
}
