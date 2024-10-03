import axios from 'axios';
import { ApodData, WeatherData, RoverImageData, RoverType } from '../models/nasaApiInterface';

export class ApiService {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:5001/bounce-insights-ui/us-central1/bounce_insights_api';
  }

  async getWithRetry(url: string, retries: number, delay: number): Promise<any> {
    try {
      const response = (await axios.get(url)).data;
      return response;
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.getWithRetry(url, retries - 1, delay * 2);
      }
      console.error(error);
    }
  }

  async getAPOD(retries = 3, delay = 300): Promise<undefined | ApodData> {
    return (await this.getWithRetry(`${this.baseUrl}/nasa/apod`, retries, delay)) as ApodData;
  }

  async getMarsWeather(retries = 3, delay = 300): Promise<WeatherData | undefined> {
    return (await this.getWithRetry(`${this.baseUrl}/nasa/weather`, retries, delay)) as WeatherData;
  }

  async getRoverImagesForSol(sol: number, page: number, roverType: RoverType, retries = 3, delay = 300): Promise<RoverImageData | undefined> {
    return (await this.getWithRetry(
      `${this.baseUrl}/nasa/roverImagesForSol?sol=${sol}&page=${page}&rover_type=${roverType}`,
      retries,
      delay
    )) as RoverImageData;
  }

  async getRoverImagesForEarthDate(date: Date, page: number, roverType: RoverType, retries = 3, delay = 300): Promise<RoverImageData | undefined> {
    return (await this.getWithRetry(
      `${this.baseUrl}/nasa/roverImagesForEarthDate?earth_date=${date}&page=${page}&rover_type=${roverType}`,
      retries,
      delay
    )) as RoverImageData;
  }
}
