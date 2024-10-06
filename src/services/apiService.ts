import axios, { AxiosInstance } from 'axios';
import { ApodData, WeatherData, RoverImageData, RoverType } from '../models/nasaApiInterface';

export class ApiService {
  baseUrl: string;
  axiosInstance: AxiosInstance;

  constructor() {
    this.baseUrl = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:5001/bounce-insights-ui/us-central1/bounce_insights_api';

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getWithRetry(url: string, retries: number, delay: number): Promise<any> {
    try {
      const response = (await this.axiosInstance.get(url)).data;
      return response;
    } catch (error: any) {
      console.error(error);
      const isRetryable = error.response ? error.response.status >= 500 : !error.response;

      if (retries > 0 && isRetryable) {
        console.warn(`Retrying... attempts remaining: ${retries}, error: ${error.message}`);

        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.getWithRetry(url, retries - 1, delay * 2);
      }
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

  async getRoverImagesForEarthDate(
    year: number,
    month: number,
    day: number,
    page: number,
    roverType: RoverType,
    retries = 3,
    delay = 300
  ): Promise<RoverImageData[] | undefined> {
    return (await this.getWithRetry(
      `${this.baseUrl}/nasa/roverImagesForEarthDate?year=${year}&month=${month}&day=${day}&page=${page}&rover_type=${roverType}`,
      retries,
      delay
    )) as RoverImageData[];
  }
}
