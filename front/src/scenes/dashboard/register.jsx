import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import React from "react";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [token, setToken] = useState("");


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleFormSubmit = (values) => {
    clienteAxios
      .post("/api/register", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.headers);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResetForm = (resetForm) => {
    resetForm({ values: initialValues });
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  /*acá comienza el form */

  return (
    <div className="FormMat">
      <Header title="Crear Usuario" subtitle="Crear un nuevo Usuario" />
      <div className="Formulario">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nombre Completo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <FormControl sx={{ gridColumn: "span 4" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={touched.password && Boolean(errors.password)}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                  {touched.password && Boolean(errors.password) && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>

                <FormControl sx={{ gridColumn: "span 4" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirmar Contraseña
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={values.password_confirmation}
                    onChange={handleChange("password_confirmation")}
                    onBlur={handleBlur("password_confirmation")}
                    error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                    name="password_confirmation"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="password_confirmation"
                  />
                  {touched.password_confirmation && Boolean(errors.password_confirmation) && (
                    <FormHelperText error>{errors.password_confirmation}</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  //  disabled={Object.keys(errors).length !== 0} // Deshabilita el botón si hay errores de validación
                >
                  Crear Usuario
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="contained"
                  onClick={() => handleResetForm(resetForm)}
                  sx={{ marginLeft: "10px" }}
                >
                  Limpiar campos
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Usuario creado correctamente</DialogTitle>
        </Dialog>
        <div className="Boton">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            component={Link}
            to={`/`}
          >
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("campo requerido"),
  email: yup.string().required("campo requerido"),
  password: yup.string().required("campo requerido"),
  password_confirmation: yup.string()
  .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
  .required("La confirmación de contraseña es requerida"),
});

export default Register;
