import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import React from "react";
import clienteAxios from "../../helpers/clienteAxios";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

const FormVar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("api/mostrarInv")
      .then((response) => {
        const opcion = response.data.map((item) => {
          return { id: item.id, label: item.nombre_mat };
        });
        console.log(opcion);
        setMateriales(opcion);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (values) => {
    const data = {
      nombre_variante: values.nombre_variante,
      desc_variante: values.desc_variante,
      largo_variante: Number(values.largo_variante),
      ancho_variante: Number(values.ancho_variante),
      material: values.material,
      valor: values.valor,
    };
  
    clienteAxios
      .post("/api/crearVari", data)
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
          onSubmit={(values, { setSue }) => {
            console.log(values, setSue);
          }}
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
                  onChange={(event, value) => setFieldValue("material", value)}
                  multiple
                  id="tags-filled"
                  options={materiales}
                  defaultValue={[]}
                  freeSolo
                  name="material"
                  renderTags={(values, getTagProps) =>
                    values.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.label}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="Material(es)"
                      placeholder="Material(es)"
                      sx={{ gridColumn: "span 4" }}
                    />
                  )}
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
                  //  disabled={Object.keys(errors).length !== 0} // Deshabilita el botón si hay errores de validación
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
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  nombre_variante: yup.string().required("campo requerido"),
  desc_variante: yup.string().required("campo requerido"),
  largo_variante: yup.string().required("campo requerido"),
  ancho_variante: yup.string().required("campo requerido"),
   // material: yup.string().required("campo requerido"),
  valor: yup.string().required("campo requerido"),
});

export default FormVar;
