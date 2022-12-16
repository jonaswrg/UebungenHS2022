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
    // TODO: Parametrisieren
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
      <h1>Geodetic Line</h1>
      <div>Wohin wollen Sie von Zürich aus fliegen?</div>

      <Button variant="contained" onClick={() => { do_download1(8.562591816333036,47.45048786731165, -0.18263989409720086,51.15235296503555) }}>
          London
        </Button>
      <Button variant="contained" onClick={() => { do_download1(8.562591816333036,47.45048786731165, -73.78466299589385,40.64583089596164) }}>
        New York
        </Button>
      <Button variant="contained" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 151.18270256957388,-33.94726186763252) }}>
      Sydney
        </Button>
        <Button variant="contained" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 18.59898390000502,-33.96991989701898) }}>
      Kapstadt
        </Button>
        <Button variant="contained" onClick={() => { do_download1(8.562591816333036,47.45048786731165, 139.78020337829975,35.54921859728793) }}>
      Tokio
        </Button>

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
