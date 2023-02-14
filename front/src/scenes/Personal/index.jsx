import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPerson } from "../../data/dataPersonEx";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";


{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */
}

const Personal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
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
      field: "area_tra",
      headerName: "Área de trabajo",
      flex: 1,
      cellCLassName: "name-column--cell",
    },
      {
        field: "obra",
        headerName: "Obra activa",
        flex: 1,
        cellCLassName: "name-column--cell",
        /*este será un id de la tabla obra */
      },
      {
        field: "dir_tra",
        headerName: "Dirección Trabajador",
        flex: 1,
        cellCLassName: "name-column--cell",
      },
      {
        field: "tele_tra",
        headerName: "Teléfono Trabajador",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
  ];

  return (
    <Box m="30px" display="block">
      <Header title="Personal " subtitle="Maneja el personal desde aquí"/>
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
            "& .MuiCheckbox-root": {
                color: `${colors.green[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.gray[100]} !important`,
              },
        }}
        
        >
        <DataGrid rows={mockDataPerson} columns={columns} components={{Toolbar: GridToolbar}} />
      </Box>
    </Box>
  );
};

export default Personal;
