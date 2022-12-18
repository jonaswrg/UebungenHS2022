import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import axios from "axios";

import "leaflet/dist/leaflet.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const geoJsonLayer = useRef(null);

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    do_download1(8.562591816333036,47.45048786731165, 8.562591816333036,47.45048786731165);
    }, []);

  useEffect(() => {
    if (geoJsonLayer.current) {
        geoJsonLayer.current.clearLayers().addData(data);
      }
  }, [data]);

  function do_download1(lng1, lat1, lng2, lat2) {
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${lat1}&startlng=${lng1}&endlat=${lat2}&endlng=${lng2}&pts=100`;

    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }



  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Wohin möchten Sie von Zürich aus fliegen?</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Zielflughafen
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="nav-link" tabindex="1" href="#" aria-current="page" onClick={() => { do_download1(8.562591816333036,47.45048786731165, -0.18263989409720086,51.15235296503555) }}>London</a></li>
            <li><a class="nav-link" tabindex="2" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, -73.78466299589385,40.64583089596164) }}>New York</a></li>
            <li><a class="nav-link" tabindex="3" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 18.59898390000502,-33.96991989701898) }}>Kapstadt</a></li>
            <li><a class="nav-link" tabindex="4" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 139.78020337829975,35.54921859728793) }}>Tokio</a></li>
            <li><a class="nav-link" tabindex="5" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 151.1783237100475,-33.939401877079874) }}>Sydney</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Zielflughafen</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" tabindex="1" href="#" aria-current="page" onClick={() => { do_download1(8.562591816333036,47.45048786731165, -0.18263989409720086,51.15235296503555) }}>London</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" tabindex="2" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, -73.78466299589385,40.64583089596164) }}>New York</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" tabindex="3" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 18.59898390000502,-33.96991989701898) }}>Kapstadt</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" tabindex="4" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 139.78020337829975,35.54921859728793) }}>Tokio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" tabindex="5" href="#" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 151.1783237100475,-33.939401877079874) }}>Sydney</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

      {error &&   <>
                     <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                  </>}

      {data &&  <>
        <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
                    style={{ height: "600px", width: "100%" }} >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
              <GeoJSON data={data} ref={geoJsonLayer} style={{ weight: 8, opacity: '30%', color: 'green'}}/>
      </MapContainer>
                </>}

      </>
  );
}

export default App;
