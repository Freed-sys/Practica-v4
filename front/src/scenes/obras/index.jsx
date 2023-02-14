import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/dataExample";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Form from "../formMaterial";
import "../global/App.css";


{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */
}

const Obras = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Código Orden" },
    {
      field: "nombre_mat",
      headerName: "Código Casa",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "tipo_mat",
      headerName: "Tipo Casa",
      cellCLassName: "name-column--cell",
    },
    {
      field: "cant_mat",
      headerName: "Dimensiones Casa",
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>
            {params.row.precio} mt²
        </Typography>
      )
    },
    {
        field: "En Proceso",
        headerName: "Estado Obra",
        cellCLassName: "name-column--cell",
      },
    {
      field: "precio",
      headerName: "Valor Casa",
      flex:1,
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>
            ${params.row.precio}
        </Typography>
      )
    },
    {
        field: "En Proceso",
        headerName: "Observaciones",
        cellCLassName: "name-column--cell",
        headerAlign: "left",
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
        <DataGrid rows={mockDataTeam} columns={columns} components={{Toolbar: GridToolbar}}/>
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
