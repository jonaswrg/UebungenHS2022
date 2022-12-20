import React, { useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import axios from "axios";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import 'leaflet/dist/leaflet.css';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

function App() {
  const [data, setData] = useState(null);
  const [startLat, setStartLat] = useState(1)
  const [startLon, setStartLon] = useState(1)
  const [endLat, setEndLat] = useState(1)
  const [endLon, setEndLon] = useState(1)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [pkt, setPkt] = useState(100)
  const geoJsonLayer = useRef(null);


    function reload() {
      window.location.reload();
    }

  function do_download() {
    var url = `https://vm1.sourcelab.ch/geodetic/line?startlat=${startLat}&startlng=${startLon}&endlat=${endLat}&endlng=${endLon}&pts=100`;
   
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

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    }, []);


  useEffect(() => {
   if(geoJsonLayer.current) {
      geoJsonLayer.current.clearLayers().addData(data)
    }
  }, [data]);

  return (
    <>
    <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant='h4'>Geodetic Line</Typography>
                
            </Toolbar>
            <IconButton
          onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
        position: 'fixed',
          bottom: 0,
          left: 10,         
          padding: '1rem 3rem',
          
          fontSize: '20px',
          backgroundColor: '#93acad',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        top
      </IconButton>
            </AppBar>
            <br/>

    <Grid container spacing={2}>
          <Grid container item xs={6} spacing={-8}>
            <Grid item xs={2}>
                <h4>Startpunkt:</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Lat" variant="outlined" onChange={(e) => setStartLat(e.target.value)} />
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Lon" variant="outlined" onChange={(e) => setStartLon(e.target.value)} />
            </Grid>
          </Grid>

          <Grid container item xs={6} spacing={-8}>
            <Grid item xs={2}>
                <h4>Endpunkt:</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Lat" variant="outlined" onChange={(e) => setEndLat(e.target.value)}/>
            </Grid>
            <Grid item xs={4}>
              <TextField type = "number" label="Lon" variant="outlined" onChange={(e) => setEndLon(e.target.value)}/>
            </Grid>
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" onClick = { () => {do_download()}}>
            Convert
            </Button><p/>
            <Button variant="contained" onClick={() => { reload() }}>Reset</Button><p/>
          </Grid>
        </Grid>

        {!data && <>
        
          <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }} >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
           <GeoJSON data={data} style={{ weight: 8, opacity: '50%', color: 'blue'}}/>

          </MapContainer>
          </>
        }
      

      {loading && <>
                     <div>API Aufruf, bitte warten!</div><br/>
                  </>
      }

      {error &&   <>
                     <div>ERROR API Aufruf fehlgeschlagen</div>{console.log(error)}<br/>
                  </>}

      {data &&  <>
          <MapContainer center={[47.5349, 7.6416]} zoom={2} scrollWheelZoom={true}
          style={{ height: "600px", width: "100%" }} >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                  
           <GeoJSON data={data} style={{ weight: 8, opacity: '50%', color: 'blue'}}/>

          </MapContainer>
                </>}
  
      </>
  );
}

export default App;