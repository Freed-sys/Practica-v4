import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/dataExample";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../formInventario";
import "../global/App.css";
import clienteAxios from "../../helpers/clienteAxios";

{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */
}

const Obras = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [obra, setObra] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarOrden")
      .then((response) => {
        const obrasConIds = response.data.map((obra, index) => ({
          ...obra,
          id: index + 1,
        }));
        setObra(obrasConIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    {
      field: "nombre_cliente",
      headerName: "Cliente",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.gray[100]}>
          {params.row.nombre_cliente}
        </Typography>
      ),
    },
    {
      field: "apellidos_cliente",
      headerName: "Apellidos Cliente",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.gray[100]}>{params.row.apellidos_cliente}</Typography>
      ),
    },
    {
      field: "nombre_variante",
      headerName: "Casa",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.gray[100]}>
          {params.row.nombre_variante}
        </Typography>
      ),
    },
    {
      field: "estado",
      headerName: "Estado Obra",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.gray[100]}>{params.row.name}</Typography>
      ),
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
          <Button variant="contained" color="secondary">
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="30px" display="grid">
      <Header
        title="Obras "
        subtitle="Maneja el estado de las obras desde aquí"
      />
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
        }}
      >
        <DataGrid
          rows={obra}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <div className="Boton">
        <Button type="submit" color="secondary" variant="contained">
          Crear Obra
        </Button>
      </div>
    </Box>
  );
};

export default Obras;
