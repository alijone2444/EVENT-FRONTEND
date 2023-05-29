import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import Image from './images/symbol.png'

export default function SimpleMap() {
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const [center, setCenter] = useState({
    lat: 33.6055464, // Default center latitude (Rawalpindi, Pakistan)
    lng: 73.0439438  // Default center longitude (Rawalpindi, Pakistan)
  });
  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const address = " Islamabad, Pakistan"; // Replace with your desired location
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        ); // Replace YOUR_API_KEY with your actual Google Maps API key
        const data = await response.json();

        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setMarkerCoordinates(location);
          setCenter(location);
        }
      } catch (error) {
        console.log(error);
      }
    };

    geocodeAddress();
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '80%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={center}
        defaultZoom={11}
      >
        {markerCoordinates && (
          <Marker
            lat={markerCoordinates.lat}
            lng={markerCoordinates.lng}
            image={Image} 
            />
        )}
      </GoogleMapReact>
    </div>
  );
}

const Marker = () => <img src={Image}  style={{width:"40px",height:"40px"}} alt="Marker" />;
