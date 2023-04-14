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
  import { Link } from "react-router-dom";
  import clienteAxios from "../../helpers/clienteAxios";
  
  const EditCli = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [regiones, setRegiones] = useState([]);
    const [selectedClienteId, setSelectedClienteId] = useState('');
    const [editars, setEditars] = useState([]);
  
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

    useEffect(() => {
        clienteAxios
          .get("/api/listarCliente")
          .then((response) => {
            setEditars(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
  
      const handleFormSubmit = (values) => {
        clienteAxios
          .post(`/api/cliente/editar/${selectedClienteId}`, values)
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
        <Header title="Editar Cliente" subtitle="Edita los datos del cliente" />
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
                  label="Cliente"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedClienteId(e.target.value);
                    console.log(selectedClienteId);
                  }}
                  value={selectedClienteId}
                  name="nombre"
                  error={!!touched.nombre && !!errors.nombre}
                  helperText={touched.nombre && errors.nombre}
                  sx={{ gridColumn: "span 4" }}
                >
                  {editars.map((editar) => (
                    <MenuItem key={editar.id} value={editar.id}>
                      {`${editar.nombre_cliente} ${editar.apellidos_cliente}`}
                    </MenuItem>
                  ))}
                </TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Rut Cliente (Sin puntos, con guión)"
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
                    label="Número Casa"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.num_casa}
                    name="num_casa"
                    error={
                      !!touched.num_casa && !!errors.num_casa
                    }
                    helperText={
                      touched.num_casa && errors.num_casa
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
                    Actualizar Cliente
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
            <DialogTitle>Cliente Actualizado correctamente</DialogTitle>
          </Dialog>
          <div className="Boton">
          <Button type="submit" color="secondary" variant="contained"
          component={Link}
          to={`/clientes`}
          >
            Volver atrás
          </Button>
        </div>
        </div>
      </div>
    );
  };
  
  const checkoutSchema = yup.object().shape({
    rut_cliente: yup.string().required("campo requerido"),
    nombre_cliente: yup.string().required("campo requerido"),
    apellidos_cliente: yup.string().required("campo requerido"),
    region_id: yup.string().required("campo requerido"),
    comuna: yup.string().required("campo requerido"),
    direccion_cliente: yup.string().required("campo requerido"),
    num_casa: yup.string().required("campo requerido"),
    telefono_cliente: yup.string().required("campo requerido"),
    email: yup.string().required("campo requerido"),
    telefono_cliente: yup
      .string()
      .required("El teléfono es requerido")
      .matches(
        /^\+?56(\s?)(0?9)(\s?)[9876543]\d{7}$/,
        "Ingresa un número de teléfono válido"
      ),
      rut_cliente: yup
        //analizar la validación del rut
        .string()
        .matches(/^[0-9]+-[0-9kK]{1}$/, "Se requiere un Rut Válido, sin puntos.")
        .required("Se requiere un Rut"),
  });
  const initialValues = {
    rut_cliente: "",
    nombre_cliente: "",
    apellidos_cliente: "",
    region_id: "",
    comuna: "",
    direccion_cliente: "",
    num_casa: "",
    telefono_cliente: "",
    email: "",
  };
  
  export default EditCli;
  