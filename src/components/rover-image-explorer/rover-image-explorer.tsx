import './rover-image-explorer.scss';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ApiService } from '../../services/apiService';
import { RoverType, RoverImageData, RoverCameraType } from '../../models/nasaApiInterface';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { get } from 'http';
import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';

export default function RoverImageExplorer() {
  const today: Dayjs = dayjs();
  const tempDate = dayjs('2023-01-04');
  const apiService = new ApiService();
  const [selectedDate, setSelectedDate] = useState(tempDate as Dayjs | null);
  const [roverImages, setRoverImages] = useState([] as RoverImageData[]);
  const [roverType, setRoverType] = useState(RoverType.CURIOSITY);
  const [cameraTypes, setCameraTypes] = useState([] as RoverCameraType[]);
  const [cameraTypesString, setCameraTypesString] = useState([] as string[]);
  const [page, setPage] = useState(1);
  const [hasNoResults, setHasNoResults] = useState(false);
  const curiosityLandingDate = dayjs('2012-08-06');

  const [hasMoreData, setHasMoreData] = useState(true); // Track if there's more data to fetch

  const selectDate = (date: Dayjs | null) => {
    if (date === selectedDate || !date) return;
    setRoverImages([]);
    setSelectedDate(date);
    setPage(1);
    setHasMoreData(true);
    getRoverImagesForDate(date, 1);
  };

  const getRoverImagesForDate = async (date: Dayjs, page: number) => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    const roverImagesResponse = await apiService.getRoverImagesForEarthDate(year, month, day, page, roverType);

    if (roverImagesResponse && roverImagesResponse.length > 0) {
      setHasNoResults(false);

      setRoverImages([...roverImages, ...roverImagesResponse]);
    } else {
      if (roverImages.length === 0) {
        setHasNoResults(true);
      }
      setHasMoreData(false);
    }
    console.log('rover images', roverImagesResponse);
  };

  const loadMoreData = async () => {
    getRoverImagesForDate(selectedDate!, page);
    setPage(page + 1);
  };

  const handleChange = (event: SelectChangeEvent<typeof cameraTypesString>) => {
    const {
      target: { value },
    } = event;
    setCameraTypesString(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    return () => {
      setRoverImages([]);
    };
  }, []);

  const hasSelectedCamera = (roverImage: RoverImageData) => {
    if (cameraTypesString.length === 0) return true;
    return cameraTypesString.includes(roverImage.camera.full_name.toLocaleLowerCase());
  };

  return (
    <div className="home-container rover-explorer-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h4">Curiosity Rover Image Explorer</Typography>
        <Typography variant="body2">Select a date to view the images taken by the Curiosity rover on that date</Typography>

        <div className="action-bar">
          <FormControl fullWidth>
            <DatePicker
              className="date-picker"
              label="Rover Images Date"
              onChange={selectDate}
              minDate={curiosityLandingDate}
              maxDate={today}
              defaultValue={tempDate}
              value={tempDate}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Camera Type</InputLabel>
            <Select
              multiple
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cameraTypesString}
              label="rover camera type"
              onChange={handleChange}
            >
              get all camera types values from enum and display them here
              {Object.values(RoverCameraType).map((camera) => (
                <MenuItem key={camera.toLocaleLowerCase()} value={camera.toLocaleLowerCase()}>
                  {camera.toLocaleLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {hasNoResults && <Typography variant="body2">No images found for the selected date</Typography>}
        {roverImages && (
          <InfiniteScroll dataLength={roverImages.length} next={loadMoreData} hasMore={hasMoreData} loader={<div>Loading More data...</div>}>
            <div className="pagination-container">
              {roverImages.map(
                (roverImage, id) =>
                  hasSelectedCamera(roverImage) && (
                    <div key={id}>
                      <img src={roverImage.img_src} alt={roverImage.camera.full_name} className="rover-image" />
                    </div>
                  )
              )}
            </div>
          </InfiniteScroll>
        )}
      </LocalizationProvider>
    </div>
  );
}
