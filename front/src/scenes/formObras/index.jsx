import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Skeleton,
} from "@mui/material";
import { ListItemText } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const FormObra = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState([]); //los estados siempre en plural
  const [valores, setValores] = useState([]);
  const [variantes, setVariantes] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [selectedMateriales, setSelectedMateriales] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listarCliente")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listarVariantes")
      .then((response) => {
        setVariantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/mostrarInv")
      .then((response) => {
        setMateriales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listarEstado")
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectedMaterialesChange = (event) => {
    setSelectedMateriales(event.target.value);
  };

  const handleFormSubmit = (values) => {
    axios
      .post("http://localhost:8000/api/crearOrden", values)
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
          onSubmit={() => handleFormSubmit}
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
                {clientes == [] ? null : (
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
                      <MenuItem key={cliente.id} value={cliente.nombre_cliente}>
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
                  label="Materiales"
                  value={selectedMateriales}
                  onChange={handleSelectedMaterialesChange}
                  name="materiales"
                  error={!!touched.materiales && !!errors.materiales}
                  helperText={touched.materiales && errors.materiales}
                  sx={{ gridColumn: "span 2" }}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => selected.join(", "),
                  }}
                >
                  {materiales.map((material, indice) => (
                    <MenuItem key={indice} value={material.nombre_mat}>
                      <Checkbox
                        checked={selectedMateriales.includes(
                          material.nombre_mat
                        )}
                      />
                      <ListItemText primary={material.nombre_mat} />
                    </MenuItem>
                  ))}
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
                  sx={{ gridColumn: "span 2" }}
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
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                //  disabled={Object.keys(errors).length !== 0} // Deshabilita el botón si hay errores de validación
                >
                  Crear Trabajador
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
  cliente: yup.string().required("campo requerido"),
  variante: yup.string().required("campo requerido"),
  material: yup.string().required("campo requerido"),
  estado: yup.string().required("campo requerido"),
});
const initialValues = {
  cliente: "",
  variante: "",
  material: "",
  estado: "",
};

export default FormObra;
