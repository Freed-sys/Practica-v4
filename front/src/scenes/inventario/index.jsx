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

const Inventario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nombre_mat",
      headerName: "Nombre Material",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
    {
      field: "tipo_mat",
      headerName: "Tipo Material",
      cellCLassName: "name-column--cell",
    },
    {
      field: "cant_mat",
      headerName: "Cantidad ",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "precio",
      headerName: "Precio Unitario",
      flex:1,
      renderCell: (params) => (
        <Typography color={colors.brown[400]}>
            ${params.row.precio}
        </Typography>
      )
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
        <DataGrid rows={mockDataTeam} columns={columns} components={{Toolbar: GridToolbar}}/>
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
