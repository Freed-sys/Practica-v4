import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/dataExample";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "../formMaterial";
import "../global/App.css";


{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */
}

const Obras = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [obra, setObra] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/mostrarOrden')
      .then((response) => {
        const obrasConIds = response.data.map((obra, index) => ({...obra, id: index + 1}));
        setObra(obrasConIds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const columns = [
    { field: "id", headerName: "Código Orden" },
  {
    field: "valor",
    headerName: "Valor Casa",
    flex: 1,
    cellClassName: "name-column--cell",
    renderCell: (params) => (
      <Typography color={colors.brown[400]}>$ {params.row.valor}</Typography>
    ),
  },
  {
    field: "casa",
    headerName: "Tipo Casa",
    flex: 1,
    cellClassName: "name-column--cell",
    renderCell: (params) => (
      <Typography color={colors.brown[400]}>{params.row.tipo}</Typography>
    ),
  },
  {
    field: "material",
    headerName: "Material",
    flex: 1,
    cellClassName: "name-column--cell",
    renderCell: (params) => (
      <Typography color={colors.brown[400]}>
        {params.row.nombre_material}
      </Typography>
    ),
  },
  {
    field: "estado",
    headerName: "Estado Obra",
    flex: 1,
    cellClassName: "name-column--cell",
    renderCell: (params) => (
      <Typography color={colors.brown[400]}>{params.row.name}</Typography>
    ),
  },

  ];

  return (
    <Box m="30px" display="grid">
      <Header title="Obras " subtitle="Maneja el estado de las obras desde aquí"/>
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
        <DataGrid rows={obra} columns={columns} components={{Toolbar: GridToolbar}}/>
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
