import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Timer from './Timer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function App() {
  const [render, setRender] = React.useState(false);

  function buttonClicked() {
    setRender(true);
  }

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6">Counter</Typography>
        </Toolbar>

      </AppBar>


        <Timer />

    </>
  );
}


export default App;

