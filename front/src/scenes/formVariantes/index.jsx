import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  FormGroup,
  Skeleton,
  Select,
} from "@mui/material";
import { ListItemText } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import clienteAxios from "../../helpers/clienteAxios";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";

const FormVar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [materiales, setMateriales] = useState([]);
  const [selectedMateriales, setSelectedMateriales] = useState([]);
  const [fieldValue, setFieldValue] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("api/mostrarInv")
      .then((response) => {
        setMateriales(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (values) => {
    console.log(values);
    const materialesString = selectedMateriales.join(", ");
    clienteAxios
      .post("/api/crearVari", { ...values, materiales: materialesString })
      .then((response) => {
        console.log(response.data);
        setOpen(true);
        values.materiales = materialesString;
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
  const handleMaterialSelect = (event, value) => {
    setSelectedMateriales(value);
  };
 
  const initialValues = {
    nombre_variante: "",
    desc_variante: "",
    largo_variante: "",
    ancho_variante: "",
    material: [],
    valor: "",
  };
  /*acá comienza el form */

  return (
    <div className="FormMat">
      <Header
        title="Crear Variante"
        subtitle="Crear una nueva variación de las Casas"
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
            handleMaterialSelect,
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
                  label="Nombre Variante"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nombre_variante}
                  name="nombre_variante"
                  error={!!touched.nombre_variante && !!errors.nombre_variante}
                  helperText={touched.nombre_variante && errors.nombre_variante}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Descripción Variante"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.desc_variante}
                  name="desc_variante"
                  error={!!touched.desc_variante && !!errors.desc_variante}
                  helperText={touched.desc_variante && errors.desc_variante}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Largo (En metros cuadrados)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.largo_variante}
                  name="largo_variante"
                  error={!!touched.largo_variante && !!errors.largo_variante}
                  helperText={touched.largo_variante && errors.largo_variante}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Ancho (En Metros Cuadrados)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ancho_variante}
                  name="ancho_variante"
                  error={!!touched.ancho_variante && !!errors.ancho_variante}
                  helperText={touched.ancho_variante && errors.ancho_variante}
                  sx={{ gridColumn: "span 2" }}
                />
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={materiales.map((material) => material.nombre_mat)}
                  defaultValue={[]}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                      onChange={handleMaterialSelect}
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Material(es)"
                      placeholder="Seleccione o agregue materiales"
                      error={!!touched.material && !!errors.material}
                      helperText={touched.material && errors.material}
                    />
                  )}
                  onBlur={handleBlur}
                  onChange={(event, value) => {
                    setSelectedMateriales("material", value);
                    handleChange(event);
                  }}
                  value={values.material}
                  name="material"
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Valor (en CLP)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.valor}
                  name="valor"
                  error={!!touched.valor && !!errors.valor}
                  helperText={touched.valor && errors.valor}
                  sx={{ gridColumn: "span 2" }}
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
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  nombre_variante: yup.string().required("campo requerido"),
  desc_variante: yup.string().required("campo requerido"),
  largo_variante: yup.string().required("campo requerido"),
  ancho_variante: yup.string().required("campo requerido"),
  material: yup.string().required("campo requerido"),
  valor: yup.string().required("campo requerido"),
});

export default FormVar;
