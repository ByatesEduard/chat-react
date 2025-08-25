import React from 'react'
import { Container, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 54 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          alignItems="center"
          direction="column"
        >
         <div className="loader"></div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader