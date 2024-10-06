# Nasa Application created for Bounce Insights Coding challenge

This is a react front end that integrates with a firebase function nodejs backend to pull NASA astronomy picture of the day, rover images and displays a map of mars landscape

This project uses the open nasa api (https://api.nasa.gov/)

- Deployed live at: https://bounce-insights-ui.web.app/

# How to run front end:

- npm i
- npm start

when run from dev environment the front end will try connect with backend url: http://127.0.0.1:5001/bounce-insights-ui/us-central1/bounce_insights_api

Please refer to readme in bounce-insights-nasa-api (https://github.com/terrydarcy/bounce-insights-api) to run backend locally.

## Features on the web app

- APOD - Astronomy picture of the day.
  I am using the apod endpoint of the nasa api to retrieve a nominated picture of the day that updates daily. Informing the user about the image context.

- Mars Map - I am using leafletJs to display a map with a mars landscapre overlay to show points of interest and rover landing locations.

- Rover Image Explorer - I am using the rover images endpoint of the nasa api to pull rover images for the curiosity rover.

I had some issues with the manifest endpoint. This is an endpoint that returns metadata information to assist with pagination such as providing the total images availabe. As a result I used infinite scroll pagnination to show the full list of pagniated rover images for a selected date. A user can also filter the images by a particular camera on the rover
