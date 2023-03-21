import { React, useState, useRef } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        // redirigir al usuario a la página principal o al panel de control
      })
      .catch((error) => {
        console.error(error);
        // mostrar un mensaje de error al usuario
      });
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#7a5433" };
  const btnstyle = {
    margin: "8px 0",
    backgroundColor: "#7a5433",
    color: "white",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Iniciar Sesión</h2>
        </Grid>
        <form onSubmit={handleLogin}>
          <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          <TextField
            label="Email"
            placeholder="Ingrese e-mail"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ margin: "20px" }} />
          <TextField
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Recuérdame"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
