import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import axios from "axios";
import clienteAxios from "../../helpers/clienteAxios";
import Dashboard from "../dashboard";
import Collapse from "@material-ui/core/Collapse";
import { atom, useAtom} from "jotai";
import  {setToken,getToken,deleteToken} from "../../helpers/usuario";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#7a5433",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const tokenAtom = atom(null);



const SignIn = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modoregistro, setModoregistro] = useState(false);

  const onSubmit = (data) => {
    clienteAxios
      .post("/api/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setToken(response.data.access_token);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            let motivo = err.response.data.mensaje;
            alert(`No autorizado:${motivo}`);
          }
          console.log(err.response.data.mensaje);
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
      });
  };
  

  const classes = useStyles();

  const registro = () => {
    setModoregistro(true);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ¡Bienvenido!
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", { required: true })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ backgroundColor: "#7a5433" }}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
