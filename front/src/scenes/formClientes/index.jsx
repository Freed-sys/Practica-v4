import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const FormCli = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [regiones, setRegiones] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listarRegion")
      .then((response) => {
        setRegiones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (values) => {
    axios
      .post("http://localhost:8000/api/crearCliente", values)
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
      <Header title="Crear Cliente" subtitle="Crear un nuevo Cliente" />
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
                  label="Rut Cliente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rut_cliente}
                  name="rut_cliente"
                  error={!!touched.rut_cliente && !!errors.rut_cliente}
                  helperText={touched.rut_cliente && errors.rut_cliente}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nombre Cliente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nombre_cliente}
                  name="nombre_cliente"
                  error={!!touched.nombre_cliente && !!errors.nombre_cliente}
                  helperText={touched.nombre_cliente && errors.nombre_cliente}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Apellidos Cliente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apellidos_cliente}
                  name="apellidos_cliente"
                  error={
                    !!touched.apellidos_cliente && !!errors.apellidos_cliente
                  }
                  helperText={
                    touched.apellidos_cliente && errors.apellidos_cliente
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  select
                  variant="filled"
                  label="Región"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.region_id}
                  name="region_id"
                  error={!!touched.region_id && !!errors.region_id}
                  helperText={touched.region_id && errors.region_id}
                  sx={{ gridColumn: "span 2" }}
                >
                  {regiones.map((region) => (
                    <MenuItem key={region.id} value={region.id}>
                      {region.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Dirección Cliente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.direccion_cliente}
                  name="direccion_cliente"
                  error={
                    !!touched.direccion_cliente && !!errors.direccion_cliente
                  }
                  helperText={
                    touched.direccion_cliente && errors.direccion_cliente
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Teléfono Cliente"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.telefono_cliente}
                  name="telefono_cliente"
                  error={
                    !!touched.telefono_cliente && !!errors.telefono_cliente
                  }
                  helperText={
                    touched.telefono_cliente && errors.telefono_cliente
                  }
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  disabled={Object.keys(errors).length !== 0} // Deshabilita el botón si hay errores de validación
                >
                  Crear Cliente
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
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  rut_cliente: yup.string().required("campo requerido"),
  nombre_cliente: yup.string().required("campo requerido"),
  apellidos_cliente: yup.string().required("campo requerido"),
  region_id: yup.string().required("campo requerido"),
  direccion_cliente: yup.string().required("campo requerido"),
  telefono_cliente: yup.string().required("campo requerido"),
});
const initialValues = {
  rut_cliente: "",
  nombre_cliente: "",
  apellidos_cliente: "",
  region_id: "",
  direccion_cliente: "",
  telefono_cliente: "",
};

export default FormCli;
