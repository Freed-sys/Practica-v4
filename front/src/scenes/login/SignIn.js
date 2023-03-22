import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#7a5433",
    padding: theme.spacing(2),
    borderRadius: "10px",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#7a5433",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
}));

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function handleLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const tokenElement = document.querySelector('meta[name="csrf-token"]');
  const token = tokenElement ? tokenElement.getAttribute("content") : null;
  if (!token) {
    console.error("Token CSRF no encontrado.");
    return;
  }
  api
    .post(
      "/login",
      { email, password },
      { headers: { "X-CSRF-TOKEN": token }, mode: "cors" }
    )
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      console.error(error);
    });
}


function Login() {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleLogin}>
      <TextField
        label="Email"
        variant="filled"
        name="email"
        className={classes.textField}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        name="password"
        className={classes.textField}
      />
      <Button
        variant="contained"
        className={classes.submitButton}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}

export default Login;
