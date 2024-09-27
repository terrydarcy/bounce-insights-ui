import axios from "axios";

export class ApiService {
  baseUrl: string;

  constructor() {
    console.log(process.env.REACT_APP_BASE_URL);
    this.baseUrl =
      process.env.REACT_APP_BASE_URL ||
      "http://127.0.0.1:5001/bounce-insights-ui/us-central1/bounce_insights_api";
  }

  async fetchApod() {
    try {
      const response = await axios.get(`${this.baseUrl}/nasa/apod`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching APOD data from bounce insights api");
    }
  }
}
