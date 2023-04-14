import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import "../global/App.css";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";


  /*estamos rellenando con datos falsos, rellenar con listarMaterial y función map */


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
          id: obra.id,
          observaciones: obra.observaciones 
        }));
        setObra(obrasConIds);
        console.log(obra);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleDeleteClick = (params) => {
    console.log(params.row.id);
    if (params.row && params.row.id) {
      const id = params.row.id;
      clienteAxios
        .delete(`/api/ordenTra/borrar/${id}`)
        .then((response) => {
          // eliminar el elemento de la tabla en el estado
          setObra(obra.filter((row) => row.id !== params.row.id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
        <Typography color={colors.gray[100]}>
          {params.row.apellidos_cliente}
        </Typography>
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
      headerName: "Estado",
      flex: 0.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.gray[100]}>{params.row.name}</Typography>
      ),
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 3,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.gray[100]}>{params.row.observaciones}</Typography>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.5,
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
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          onSelectionModelChange={(newSelection) => {
            setSelectedRow(
              newSelection.selection.length > 0
                ? newSelection.selection[0]
                : null
            );
          }}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <div className="Boton">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to={`/obra/new`}
          style={{ marginRight: "25px" }}
        >
          Crear Obra
        </Button>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/obra/edit`}
        >
          Editar Obra
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          component={Link}
          to={`/pdfOrden`}
          style={{ marginLeft: "25px" }}
        >
          Generar PDF
        </Button>
        
      </div>
    </Box>
  );
};

export default Obras;
