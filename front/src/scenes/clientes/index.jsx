import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/dataExample";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Form from "../formInventario";
import { useEffect, useState } from "react";
import "../global/App.css";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";

{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */
}

const Clientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("/api/listarCliente")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const tempCliente = response.data.map((element) => ({
            ...element,
          }));
          setCliente(tempCliente);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteClick = (params) => {
    if (params.row && params.row.id) {
      const id = params.row.id;
      clienteAxios
        .post(`/api/cliente/borrar/${id}`)
        .then((response) => {
          // eliminar el elemento de la tabla en el estado
          setCliente(cliente.filter((row) => row.id !== params.row.id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const columns = [

    {
      field: "rut_cliente",
      headerName: "Rut Cliente",
      flex: 1.2,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.rut_cliente}
        </Typography>
      ),
    },
    {
      field: "nombre_cliente",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.nombre_cliente}
        </Typography>
      ),
    },
    {
      field: "apellidos_cliente",
      headerName: "Apellidos",
      flex: 1.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.apellidos_cliente}
        </Typography>
      ),
    },
    {
      field: "comuna",
      headerName: "Comuna",
      flex: 0.75,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.comuna}</Typography>
      ),
    },
    {
      field: "direccion_cliente",
      headerName: "Dirección",
      flex: 3,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.direccion_cliente}, {params.row.num_casa}
        </Typography>
      ),
    },
    {
      field: "telefono_cliente",
      headerName: "Teléfono",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          + {params.row.telefono_cliente}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.email}</Typography>
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
    <Box m="30px" display="grid">
      <Header title="Clientes " subtitle="Revisa Clientes desde aquí" />
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
          rows={cliente}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <div className="Boton">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to={`/cliente/new`}
          style={{marginRight: "25px"}}
        >
          Crear Nuevo Cliente
        </Button>

        <Button variant="contained" color="primary"
        component={Link}
        to={`/cliente/edit`}>
            Editar Cliente
          </Button>
      </div>
    </Box>
  );
};

export default Clientes;
