import { Container, Grid, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "../utils/consts";

const Login = () => {
  const { auth } = useContext(Context);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate(CHAT_ROUTE, { replace: true });
    } catch (error) {
    }
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 54 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          style={{ width: 400, background: "lightgray", borderRadius: 8 }}
          container
          alignItems="center"
          direction="column"
        >
          <Box p={5}>
            <Button onClick={login} variant="outlined">
              Увійти з допомогою  Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
