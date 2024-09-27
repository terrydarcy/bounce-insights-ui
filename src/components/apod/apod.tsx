import React, { useEffect, useState } from "react";
import "./apod.scss";
import { ApiService } from "../../services/apiService";
import { ApodResponse } from "../../interfaces/apiInterface";

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
      <h1>Astronomy Picture of The Day</h1>
      {APODData && (
        <>
          <img src={APODData.url} alt={APODData.title} />
          <h2>{APODData.title}</h2>
          <p>{APODData.explanation}</p>
        </>
      )}
    </div>
  );
}
