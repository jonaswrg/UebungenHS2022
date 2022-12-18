import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import axios from "axios";

import "leaflet/dist/leaflet.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const geoJsonLayer = useRef(null);
  const airports = [
    {value: 'London', text: 'London'},
    {value: 'New York', text: 'New York'},
    {value: 'Kapstadt', text: 'Kapstadt'},
    {value: 'Tokio', text: 'Tokio'},
    {value: 'Sydney', text: 'Sydney'},
    {value: 'Zurich', text: 'Zurich'},
  ]
  const [fin, setfinn] = useState(airports[0].value);
  const [fout, setfoutt] = useState(airports[1].value);


  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    do_download1([-0.18263989409720086,51.15235296503555, -73.78466299589385,40.64583089596164]);
    }, []);

  useEffect(() => {
    if (geoJsonLayer.current) {
        geoJsonLayer.current.clearLayers().addData(data);
      }
  }, [data]);

  function do_download1(arry) {
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${arry[1]}&startlng=${arry[0]}&endlat=${arry[3]}&endlng=${arry[2]}&pts=100`;

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

  function getCord(place) {
    if (place === "London") {
      return [-0.18263989409720086,51.15235296503555]
    } else if (place === "New York") {
      return [-73.78466299589385,40.64583089596164]
    } else if (place === "Kapstadt") {
      return [18.59898390000502,-33.96991989701898]
    } else if (place === "Tokio") {
      return [139.78020337829975,35.54921859728793]
    } else if (place === "Sydney") {
      return [151.1783237100475,-33.939401877079874]
    } else if (place === "Zurich") {
      return [8.562591816333036,47.45048786731165]
    }

  }  

  function setfin(ffin) {
    setfinn(ffin)
    if (fout !== null && ffin !== fout){
      setError(null)
      do_download1(getCord(ffin).concat(getCord(fout)))
    } else if (fout === ffin) {
      setError("Airports identic");
      setfinn(fin)
    }

  }

  function setfout(ffout) {
    setfoutt(ffout)
    if (fin !== null && fin !== ffout) {
      setError(null)
      do_download1(getCord(fin).concat(getCord(ffout)))
    } else if (ffout === fin) {
      setError("Airports identic");
      setfoutt(fout)
    }

  }

  return (
    <>
    <div class="new-nav">
      <label for="airport-in">Wo wollen Sie starten?</label>
      <select id="airport-in" size="6" value={fin} onChange={o => setfin(o.target.value)}>
        {airports.map(airport => (<option key={airport.value} value={airport.value}>{airport.text}</option>))}
      </select>
      <br></br>
      <label for="airport-out">Wo wollen Sie hin?</label>
      <select id="airport-out" size="6" value={fout} onChange={o => setfout(o.target.value)}>
        {airports.map(airport => (<option key={airport.value} value={airport.value}>{airport.text}</option>))}
      </select>
    </div>

      {error &&   <>
                    <div id="div-error">{ error === "Airports iden." ? "Start- und Zielflughafen können nicht identisch sein!" : "ERROR API Aufruf fehlgeschlagen"}</div>{console.log(error)}<br/>
                  </>}

      {data &&  <>
        <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true} worldCopyJump={true} minZoom={2}
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
