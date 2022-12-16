import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {
  const[variablenname, setCount] = useState(0);
  const[lat, setLatidude] = useState(47.5348);
  const[lon, setLontigude] = useState(7.6419);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] =  useState(null)



  useEffect(() => {console.log(`useEffect${variablenname}`);})

  function download(){
    var url = `https://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=${lon}&northing=${lat}&format=json`

    setLoading(true);
    axios.get(url).then(
      (response) => {setData(response.data)}
    ).chatch(
      (err) => {setError(err);}
    ).finally(
      () => {setLoading(false);}
    )
  }

  return <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Breite" variant='outlined' defaultValue={lat} onChange={(event) => {setLatidude(event.target.value)}}/>
        </Grid>
        <Grid item xs={12}>
        <TextField label="Länge" variant='outlined' defaultValue={lon} onChange={(event) => {setLontigude(event.target.value)}}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={()=> setCount(download())}>Calc...</Button>
        </Grid>
      </Grid>


        <br/><br/><div>Der Button wurde {variablenname} mal gedrückt</div>
        <div>{lat}</div><div>{lon}</div>

        {loading &&
        <h1>Bitte warten ... Die Daten werden geladen</h1>
        }

        {error &&
        <h1>Fehler ... Server Problem</h1>
        }

        {data &&
        <>
        <h1>Daten geladen</h1>
        <div>{data?.easting}</div>
        <div>{data?.northing}</div>
        </>
        }



      {variablenname > 5 && //Bedingung
        <div>Sie sind sehr fleissig</div>
      }
        </>
}

export default App;

