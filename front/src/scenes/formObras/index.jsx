import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";



const FormObra = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState([]); //los estados siempre en plural
  const [variantes, setVariantes] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/api/listarCliente")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    clienteAxios
      .get("/api/listarVariantes")
      .then((response) => {
        setVariantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    clienteAxios
      .get("/api/listarEstado")
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (values) => {
    console.log(values);
    clienteAxios
      .post("/api/creaOrden", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
        title="Crear Orden de Trabajo"
        subtitle="Crear una nueva orden de Trabajo"
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
                {clientes.length === 0 ? null : (
                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    label="Cliente"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cliente}
                    name="cliente"
                    error={!!touched.cliente && !!errors.cliente}
                    helperText={touched.cliente && errors.cliente}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {clientes.map((cliente) => (
                      <MenuItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre_cliente}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <TextField
                  fullWidth
                  select
                  variant="filled"
                  label="Tipo Casa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.variante || ""}
                  name="variante"
                  error={!!touched.variante && !!errors.variante}
                  helperText={touched.variante && errors.variante}
                  sx={{ gridColumn: "span 2" }}
                >
                  {variantes.map(
                    (
                      variante //los parámetros en singular
                    ) => (
                      <MenuItem key={variante.id} value={variante.id}>
                        {variante.nombre_variante}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <TextField
                  fullWidth
                  select
                  variant="filled"
                  label="Estado"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.estado || ""}
                  name="estado"
                  error={!!touched.estado && !!errors.estado}
                  helperText={touched.estado && errors.estado}
                  sx={{ gridColumn: "span 4" }}
                >
                  {estados.map(
                    (
                      estado //los parámetros en singular
                    ) => (
                      <MenuItem key={estado.id} value={estado.id}>
                        {estado.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Observaciones"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.observaciones}
                    name="observaciones"
                    error={!!touched.observaciones && !!errors.observaciones}
                    helperText={touched.observaciones && errors.observaciones}
                    sx={{ gridColumn: "span 4" }}
                  />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  //         disabled={Object.keys(errors).length !== 0}
                >
                  Crear Orden
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
        to={`/obras`}
        >
          Volver atrás
        </Button>
      </div>
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  cliente: yup.string().required("campo requerido"),
  variante: yup.string().required("campo requerido"),
  estado: yup.string().required("campo requerido"),
});
const initialValues = {
  cliente: "",
  variante: "",
  estado: "",
};

export default FormObra;
