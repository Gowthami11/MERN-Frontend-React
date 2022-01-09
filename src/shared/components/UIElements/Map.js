import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  
  const { center, zoom } = props;
debugger;
  useEffect(() => {
    let map
    const googleScript = document.getElementById('google-map-script')

   
    
    if(window.google){
     map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    console.log('map',map)
  
    new window.google.maps.Marker({ position: center, map: map });}
  }, [center, zoom]);  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
