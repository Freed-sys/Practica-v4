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

const Personal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarTra")
      .then((response) => {
        setPersonal(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClick = (params) => {
    if (params.row && params.row.id) {
      const id = params.row.id;
      clienteAxios
        .post(`/api/tra/borrar/${id}`)
        .then((response) => {
          // eliminar el elemento de la tabla en el estado
          setPersonal(personal.filter((row) => row.id !== params.row.id));
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
      field: "rut_tra",
      headerName: "Rut Trabajador",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "nombre_tra",
      headerName: "Nombre Trabajador",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "apellidos_tra",
      headerName: "Apellidos Trabajador",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "comuna",
      headerName: "Comuna",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "direccion_tra",
      headerName: "Dirección Trabajador",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "num_calle",
      headerName: "Número Casa",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "tel_tra",
      headerName: "Teléfono",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          + {params.row.tel_tra}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "e-mail",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <>
          <Button variant="contained" color="primary">
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
      <Header title="Personal " subtitle="Maneja el personal desde aquí" />
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
          rows={personal}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <div className="Boton">
        <Button type="submit" color="secondary" variant="contained"
        component={Link}
        to={`/trabajador/new`}
        >
          Crear Trabajador
        </Button>
      </div>
    </Box>
  );
};

export default Personal;
