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
} from "@mui/material";
import { ListItemText } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import clienteAxios from "../../helpers/clienteAxios";

const FormVar = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [materiales, setMateriales] = useState([]);
  const [selectedMateriales, setSelectedMateriales] = useState([]);

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
    values.materiales = selectedMateriales;
    console.log(selectedMateriales);
    clienteAxios
      .post("/api/crearVari", values)
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
  const handleSelectedMaterialesChange = (event) => {
    setSelectedMateriales(event.target.value);
    console.log(event.target.value);
  };

  const handleResetForm = (resetForm) => {
    resetForm({ values: initialValues });
  };

  const initialValues = {
    nombre_variante: "",
    desc_variante: "",
    largo_variante: "",
    ancho_variante: "",
    material: materiales.length > 0 ? materiales[0].id : "",
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
                  select
                  variant="filled"
                  label="Tipo Casa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.material || ""}
                  name="material"
                  error={!!touched.material && !!errors.material}
                  helperText={touched.material && errors.material}
                  sx={{ gridColumn: "span 2" }}
                >
                  {React.Children.toArray(
                    materiales.map((material) => (
                      <MenuItem key={material.id} value={material.id}>
                        {material.nombre_mat}
                      </MenuItem>
                    ))
                  )}
                </TextField>
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
