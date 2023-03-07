import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/dataExample";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Form from "../formMaterial";
import axios from "axios";
import { useEffect, useState } from "react";
import "../global/App.css";


{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */
}

const Inventario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [inventario, setInventario] = useState([]);


  useEffect(() => {
    axios.post('http://localhost:8000/api/mostrarInv')
      .then((response) => {
        const inventariosConIds = response.data.map((inv, index) => ({...inv, id: index + 1}));
        setInventario(inventariosConIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nombre_mat",
      headerName: "Nombre Material",
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>{params.row.nombre_mat}</Typography>
      ),
    },
    {
      field: "tipo_mat",
      headerName: "Tipo Material",
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>{params.row.tipo_mat}</Typography>
      ),
    },
    {
      field: "cant_mat",
      headerName: "Cantidad Material",
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>{params.row.cant_mat}</Typography>
      ),
    },
    {
      field: "unidad_mat",
      headerName: "Unidad de Medida",
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>{params.row.unidad_mat}</Typography>
      ),
    },
    {
      field: "precio_unitario",
      headerName: "Precio",
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[400]}> $ {params.row.precio_unitario}</Typography>
      ),
    },
  ];

  return (
    <Box m="30px" display="grid">
      <Header title="Inventario " subtitle="Maneja el inventario desde aquí"/>
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
                color: colors.green[400]
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.brown[900],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.green[900],
            },
            "& .MuiDataGrid-footerContainer":{
                borderTop: "none",
                backgroundColor: colors.brown[900],
            },
        }}
        
        >
        <DataGrid rows={inventario} columns={columns} components={{Toolbar: GridToolbar}}/>
      </Box>    
      <div className="Boton">
      <Button type="submit" color="secondary" variant="contained">
                Crear Material
              </Button>
      </div>
    </Box>
    
  );
};

export default Inventario;
