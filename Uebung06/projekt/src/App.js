import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";


import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet'


function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  const redOptions = { color: 'red' }
  const blueOptions = { color: 'blue' }
  const greenOptions = { color: 'green' }
  const yellowOptions = { color: 'yellow' }
return (
  <MapContainer center={[46.92544, 8.27228]} zoom={9} scrollWheelZoom={true}>
  <TileLayer url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
      attribution='&copy; swisstopo'
  />

  <Marker position={[46.96888, 7.26804]}>
    <Popup>
    Kernkraftwerk Mühleberg<br/>Mühleberg<br/>BE
    </Popup>
  </Marker>
  <Marker position={[47.36608, 7.96674]}>
    <Popup>
    Kernkraftwerk Gösgen<br/>Däniken<br/>SO
    </Popup>
  </Marker>
  <Marker position={[47.55203, 8.22838]}>
    <Popup>
    Kernkraftwerk Beznau<br/>Döttingen<br/>AG
    </Popup>
  </Marker>
  <Marker position={[47.60144, 8.18281]}>
    <Popup>
    Kernkraftwerk Leibstadt<br/>Leibstadt<br/>AG
    </Popup>
  </Marker>
  <Circle center={[46.96888, 7.26804]} pathOptions={redOptions} radius={50000}></Circle>
  <Circle center={[47.36608, 7.96674]} pathOptions={blueOptions} radius={50000}></Circle>
  <Circle center={[47.55203, 8.22838]} pathOptions={greenOptions} radius={50000}></Circle>
  <Circle center={[47.60144, 8.18281]} pathOptions={yellowOptions} radius={50000}></Circle>

</MapContainer>
  );
}

export default App;