import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import {  useState } from "react";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";

const FormEstado = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (values) => {
    clienteAxios
      .post("api/crearEst", values)
      .then((response) => {
        console.log(response.data);
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

  /*acá comienza el form */

  return (
    <div className="FormMat">
      <Header
        title="Crear Estado"
        subtitle="Crear un nuevo estado para las obras"
      />
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
                  label="Nombre Estado"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  disabled={Object.keys(errors).length !== 0} // Deshabilita el botón si hay errores de validación
                >
                  Crear Material
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
          <DialogTitle>Elemento creado correctamente</DialogTitle>
        </Dialog>
        <div className="Boton">
        <Button type="submit" color="secondary" variant="contained"
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

});
const initialValues = {
  name: "",

};

export default FormEstado;
