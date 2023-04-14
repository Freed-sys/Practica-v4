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
import { Link } from "react-router-dom";
import clienteAxios from "../../helpers/clienteAxios";

const EditInv = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [umedidas, setUmedidas] = useState([]);
  const [editars, setEditars] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarInv")
      .then((response) => {
        setEditars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    clienteAxios
      .get("/api/listarUni")
      .then((response) => {
        setUmedidas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (values) => {
    clienteAxios
      .post(`/api/inventario/editar/${selectedMaterialId}`, values)
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
      <Header title="Editar Material" subtitle="Edita un Material" />
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
                  label="Material"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedMaterialId(e.target.value);
                    console.log(selectedMaterialId);
                  }}
                  value={selectedMaterialId}
                  name="material"
                  error={!!touched.material && !!errors.material}
                  helperText={touched.material && errors.material}
                  sx={{ gridColumn: "span 4" }}
                >
                  {editars.map((editar) => (
                    <MenuItem key={editar.id} value={editar.id}>
                      {editar.nombre_mat}
                    </MenuItem>
                  ))}
                </TextField>
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
                  label="Cantidad"
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
                  select
                  variant="filled"
                  label="Unidad de Medida"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.unidad_mat || ""}
                  name="unidad_mat"
                  error={!!touched.unidad_mat && !!errors.unidad_mat}
                  helperText={touched.unidad_mat && errors.unidad_mat}
                  sx={{ gridColumn: "span 2" }}
                >
                  {umedidas.map((umedida) => (
                    <MenuItem key={umedida.id} value={umedida.id}>
                      {umedida.nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Precio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.precio_unitario}
                  name="precio_unitario"
                  error={!!touched.precio_unitario && !!errors.precio_unitario}
                  helperText={touched.precio_unitario && errors.precio_unitario}
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
                  Actualizar Material
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
          <DialogTitle>Elemento Actualizado correctamente</DialogTitle>
        </Dialog>
        <div className="Boton">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            component={Link}
            to={`/inventario`}
          >
            Volver atrás
          </Button>
        </div>
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

export default EditInv;
