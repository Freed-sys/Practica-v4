import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataPerson } from "../../data/dataPersonEx";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";


{
  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función ma
  p */
}

const Personal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [personal, setPersonal] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8000/api/mostrarTra')
      .then((response) => {
        setPersonal(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "rut_trabajadores",
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
      field: "obra",
      headerName: "Obra activas",
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
        field: "tel_tra",
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
        <DataGrid rows={personal} columns={columns} components={{Toolbar: GridToolbar}} />
      </Box>
    </Box>
  );
};

export default Personal;
