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
  import axios from "axios";
  
  const FormObra = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [clientes, setClientes] = useState([]); //los estados siempre en plural
    const[valores, setValores] = useState([]);
    const[casas, setCasas] = useState([]);
    const[materiales, setMateriales] = useState([]);
    const[estados, setEstados] = useState([]);

  
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
          .get("http://localhost:8000/api/mostrarVar")
          .then((response) => {
            setValores(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      useEffect(() => {
        axios
          .get("http://localhost:8000/api/listarCasa")
          .then((response) => {
            setCasa(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      useEffect(() => {
        axios
          .get("http://localhost:8000/api/mostrarInv")
          .then((response) => {
            setMaterial(response.data);
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
        <Header title="Crear Trabajador" subtitle="Crear un nuevo Trabajador" />
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
                    onChange={handleChange}
                    value={values.cliente || ''}
                    name="cliente"
                    error={!!touched.cliente && !!errors.cliente}
                    helperText={touched.cliente && errors.cliente}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {clientes.map((cliente) => ( //los parámetros en singular
                      <MenuItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre_cliente}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    variant="filled"
                    label="Valor Casa"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.valor || ''}
                    name="valor"
                    error={!!touched.valor && !!errors.valor}
                    helperText={touched.valor && errors.valor}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {clientes.map((cliente) => ( //los parámetros en singular
                      <MenuItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre_cliente}
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
                    value={values.estado || ''}
                    name="estado"
                    error={!!touched.estado && !!errors.estado}
                    helperText={touched.estado && errors.estado}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {estados.map((estado) => (
                      <MenuItem key={estado.id} value={estado.id}>
                        {estado.name}
                      </MenuItem>
                    ))}
                  </TextField>
                
                 
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    disabled={Object.keys(errors).length !== 0} // Deshabilita el botón si hay errores de validación
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
    nombre_mat: yup.string().required("campo requerido"),
    tipo_mat: yup.string().required("campo requerido"),
    cant_mat: yup.string().required("campo requerido"),
    unidad_mat: yup.string().required("campo requerido"),
    precio_unitario: yup.string().required("campo requerido"),
  });
  const initialValues = {
    nombre_mat: "",
    tipo_mat: "",
    cant_mat: "",
    unidad_mat: "",
    precio_unitario: "",
  
  };
  
  export default FormObra;