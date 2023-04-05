import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPerson } from "../../data/dataPersonEx";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";
{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función ma
  p */
}

const Variante = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [variante, setVariante] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarVar")
      .then((response) => {
        // Add a unique ID property to each object in the array
        const data = response.data.map((item, index) => ({...item, id: index + 1}));
        setVariante(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClick = (params) => {
    if (params.row && params.row.id) {
      const id = params.row.id;
      clienteAxios
        .post(`/api/var/borrar/${id}`)
        .then((response) => {
          // eliminar el elemento de la tabla en el estado
          setVariante(variante.filter((row) => row.id !== params.row.id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      cellClassName: "id-column--cell",
      valueGetter: (params) => params.row.id,
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.id}</Typography>
      ),
    },
    {
      field: "nombre_variante",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.nombre_variante}
        </Typography>
      ),
    },
    {
      field: "desc_variante",
      headerName: "Descripción",
      flex: 3,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.desc_variante}</Typography>
      ),
},
    {
      field: "largo_variante",
      headerName: "Largo",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.largo_variante} mt² </Typography>
      ),
    },
    {
      field: "ancho_variante",
      headerName: "Ancho",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.ancho_variante} mt²
        </Typography>
      ),
    },
    {
      field: "material",
      headerName: "Materiales",
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {" "}
           {params.row.material}
        </Typography>
   ),
    },
    {
        field: "valor",
        headerName: "Precio",
        flex: 1,
        cellCLassName: "name-column--cell",
        renderCell: (params) => (
          <Typography color={colors.brown[100]}>
            {" "}
            $ {params.row.valor}
          </Typography>
     ),
      },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 2,
      sortable: false,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/inventario/editar/`}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <Box m="30px" display="block">
      <Header title="Modelos " subtitle="Maneja los Modelos disponibles aquí" />
      <Box
        m="40px 0 60px 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.green[400],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.brown[900],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.green[900],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.brown[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.green[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[900]} !important`,
          },
        }}
      >
        <DataGrid
          rows={variante}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <div className="Boton">
        <Button type="submit" color="secondary" variant="contained"
        component={Link}
        to={`/trabajador/new`}
        >
          Crear Variante
        </Button>
      </div>
    </Box>
  );
};

export default Variante;
