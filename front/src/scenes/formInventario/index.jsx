import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [umedida, setUmedida] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/listarUni")
      .then((response) => {
        setUmedida(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (values) => {
    axios
      .post("http://localhost:8000/api/crearMaterial", values)
      .then((response) => {
        console.log(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  {
    /*acá comienza el form */
  }
  return (
    <div className="FormMat">
      <Header title="Crear Material" subtitle="Crear un nuevo material" />
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
                label="Nombre Material"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre_mat}
                name="nombre_mat"
                error={!!touched.nombre_mat && !!errors.nombre_mat}
                helperText={touched.nombre_mat && errors.nombre_mat}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tipo Material"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tipo_mat}
                name="tipo_mat"
                error={!!touched.tipo_mat && !!errors.tipo_mat}
                helperText={touched.tipo_mat && errors.tipo_mat}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Unidad Material"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tipo_mat}
                name="tipo_mat"
                error={!!touched.tipo_mat && !!errors.tipo_mat}
                helperText={touched.tipo_mat && errors.tipo_mat}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cantidad Material"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cant_mat}
                name="cant_mat"
                error={!!touched.cant_mat && !!errors.cant_mat}
                helperText={touched.cant_mat && errors.cant_mat}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Precio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.precio}
                name="precio"
                error={!!touched.precio && !!errors.precio}
                helperText={touched.precio && errors.precio}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Material
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </div>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  nombre_mat: yup.string().required("campo requerido"),
  tipo_mat: yup.string().required("campo requerido"),
  cant_mat: yup.string().required("campo requerido"),
  precio: yup.string().required("campo requerido"),
});
const initialValues = {
  nombre_mat: "",
  tipo_mat: "",
  cant_mat: "",
  precio: "",
};

export default Form;

{
  /*para validar telefono en el yup (contact: yup
      .string()
      .matches(phoneRegExp, "numero invalido"))
      buscar validador numero y validador rut
  */
}
