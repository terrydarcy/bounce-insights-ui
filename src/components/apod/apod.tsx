import React, { useEffect, useState } from 'react';
import './apod.scss';
import { ApiService } from '../../services/apiService';
import { ApodResponse } from '../../models/nasaApiInterface';
import { Typography } from '@mui/material';
import MoonLoader from 'react-spinners/MoonLoader';

export default function APOD() {
  const [APODData, setAPODData] = useState<ApodResponse | undefined>();

  useEffect(() => {
    const apiService = new ApiService();
    apiService.getAPOD().then((data) => {
      setAPODData(data);
    });

    apiService.getMarsWeather().then((data) => {
      console.log('weather data', data);
    });
  }, []);

  return (
    <div className="apod-container home-container">
      {APODData ? (
        <>
          <Typography variant="h4">Astronomy Picture of The Day</Typography>

          <img src={APODData.url} alt={APODData.title} />
          <Typography variant="h4" className="title">
            {APODData.title}
          </Typography>
          <Typography variant="body2">{APODData.explanation}</Typography>
        </>
      ) : (
        <MoonLoader />
      )}
    </div>
  );
}
