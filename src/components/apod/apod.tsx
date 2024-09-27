import React, { useEffect, useState } from "react";
import "./apod.scss";
import { ApiService } from "../../services/apiService";
import { ApodResponse } from "../../interfaces/apiInterface";
import { Typography } from "@mui/material";

export default function APOD() {
  const [APODData, setAPODData] = useState<ApodResponse | null>(null);

  useEffect(() => {
    const apiService = new ApiService();
    apiService.fetchApod().then((data) => {
      setAPODData(data);
      console.log(data);
    });
  }, []);
  return (
    <div className="apod-container">
      <Typography variant="h4">Astronomy Picture of The Day</Typography>
      {APODData && (
        <>
          <img src={APODData.url} alt={APODData.title} />
          <Typography variant="h3">{APODData.title}</Typography>
          <Typography variant="body2">{APODData.explanation}</Typography>
        </>
      )}
    </div>
  );
}
