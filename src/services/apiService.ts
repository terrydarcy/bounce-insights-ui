import axios from "axios";

export class ApiService {
  baseUrl: string;

  constructor() {
    this.baseUrl =
      "http://127.0.0.1:5001/bounce-insights-api/us-central1/bounce_insights_api";
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
