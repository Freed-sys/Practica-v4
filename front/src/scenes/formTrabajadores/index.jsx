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
  import { Link } from "react-router-dom";
import clienteAxios from "../../helpers/clienteAxios";

  const FormTra = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [regiones, setRegiones] = useState([]);
  
    useEffect(() => {
      clienteAxios
        .get("/api/listarRegion")
        .then((response) => {
          setRegiones(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleFormSubmit = (values) => {
      clienteAxios
        .post("/api/creaTrabajo", values)
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
        <Header title="Crear Trabajador" subtitle="Crear un nuevo Trabajador" />
        <div className="Formulario">
          <Formik
            onSubmit = {handleFormSubmit}
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
                    label="Rut Trabajador (Sin puntos, con guión)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rut_tra}
                    name="rut_tra"
                    error={!!touched.rut_tra && !!errors.rut_tra}
                    helperText={touched.rut_tra && errors.rut_tra}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nombre Trabajador"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nombre_tra}
                    name="nombre_tra"
                    error={!!touched.nombre_tra && !!errors.nombre_tra}
                    helperText={touched.nombre_tra && errors.nombre_tra}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Apellidos Trabajador"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.apellidos_tra}
                    name="apellidos_tra"
                    error={
                      !!touched.apellidos_tra && !!errors.apellidos_tra
                    }
                    helperText={
                      touched.apellidos_tra && errors.apellidos_tra
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
                    label="Comuna"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.comuna}
                    name="comuna"
                    error={
                      !!touched.comuna && !!errors.comuna
                    }
                    helperText={
                      touched.comuna && errors.comuna
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Dirección Trabajador"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.direccion_tra}
                    name="direccion_tra"
                    error={
                      !!touched.direccion_tra && !!errors.direccion_tra
                    }
                    helperText={
                      touched.direccion_tra && errors.direccion_tra
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Número Casa"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.num_calle}
                    name="num_calle"
                    error={
                      !!touched.num_calle && !!errors.num_calle
                    }
                    helperText={
                      touched.num_calle && errors.num_calle
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Teléfono (+569)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tel_tra}
                    name="tel_tra"
                    error={
                      !!touched.tel_tra && !!errors.tel_tra
                    }
                    helperText={
                      touched.tel_tra && errors.tel_tra
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={
                      !!touched.email && !!errors.email
                    }
                    helperText={
                      touched.email && errors.email
                    }
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
          <div className="Boton">
        <Button type="submit" color="secondary" variant="contained"
        component={Link}
        to={`/personal`}
        >
          Volver atrás
        </Button>
      </div>
        </div>
      </div>
    );
  };
  
  const checkoutSchema = yup.object().shape({
    rut_tra: yup.string().required("campo requerido"),
    nombre_tra: yup.string().required("campo requerido"),
    apellidos_tra: yup.string().required("campo requerido"),
    region_id: yup.string().required("campo requerido"),
    comuna: yup.string().required("campo requerido"),
    direccion_tra: yup.string().required("campo requerido"),
    num_calle: yup.string().required("campo requerido"),
    tel_tra: yup.string().required("campo requerido"),
    email: yup.string().required("campo requerido"),
    tel_tra: yup
      .string()
      .required("El teléfono es requerido")
      .matches(
        /^\+?56(\s?)(0?9)(\s?)[9876543]\d{7}$/,
        "Ingresa un número de teléfono válido"
      ),
      rut_tra: yup
        //analizar la validación del rut
        .string()
        .matches(/^[0-9]+-[0-9kK]{1}$/, "Se requiere un Rut Válido, sin puntos.")
        .required("Se requiere un Rut"),
  });
  const initialValues = {
    rut_tra: "",
    nombre_tra: "",
    apellidos_tra: "",
    region_id: "",
    comuna: "",
    direccion_tra: "",
    num_calle: "",
    tel_tra: "",
    email: "",
  };
  
  export default FormTra;
  