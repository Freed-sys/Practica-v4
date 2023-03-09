import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import "../global/App.css";
import axios from "axios";

const FormUM = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    axios.post('http://localhost:8000/api/crearUni', values)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  {
    /*acá comienza el form */
  }
  return (
    <div className="FormMat">
      <Header title="Crear Unidad de Medida" subtitle="Crear una nueva Unidad de Medida" />
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
                label="Nombre Unidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Abreviatura"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.abreviatura}
                name="abreviatura"
                error={!!touched.abreviatura && !!errors.abreviatura}
                helperText={touched.abreviatura && errors.abreviatura}
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
  nombre: yup.string().required("campo requerido"),
  abreviatura: yup.string().required("campo requerido"),

});
const initialValues = {
  nombre: "",
  abreviatura: "",
};

export default FormUM;

