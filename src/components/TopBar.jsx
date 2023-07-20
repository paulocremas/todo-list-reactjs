import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


//Apenas a barra de título
function appBarLabel(label) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} align="center">
        {label}
      </Typography>
    </Toolbar>
  );
}

export default function setLabel() {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          {appBarLabel('Desafio WhatsMenu - ReactJS')}
        </AppBar>
    </Stack>
  );
}