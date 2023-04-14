import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import "../global/App.css";
import clienteAxios from "../../helpers/clienteAxios";
import { Link } from "react-router-dom";
const Inventario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventario, setInventario] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarInv")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const inventario = response.data.map((element) => ({
            ...element,
            id: element.id,
            total: element.precio_unitario * element.cant_mat,
          }));
          setInventario([...inventario, { id: "total", total: inventario.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0) }]);
          setTotal(inventario.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const [selectedRow, setSelectedRow] = useState(null);



  const handleDeleteClick = (params) => {
    if (params.row && params.row.id) {
      const id = params.row.id;
      clienteAxios
        .delete(`/api/inventario/borrar/${id}`)
        .then((response) => {
          // eliminar el elemento de la tabla en el estado
          setInventario(inventario.filter((row) => row.id !== params.row.id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const columns = [
    {
      field: "nombre_mat",
      headerName: "Nombre Material",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.nombre_mat}
        </Typography>
      ),
    },
    {
      field: "tipo_mat",
      headerName: "Tipo Material",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.tipo_mat}</Typography>
      ),
    },
    {
      field: "cant_mat",
      headerName: "Cantidad",
      flex: 0.5,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.cant_mat}</Typography>
      ),
    },
    {
      field: "unidad_mat",
      headerName: "Unidad",
      flex: 0.25,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {params.row.unidad_mat}
        </Typography>
      ),
    },
    {
      field: "precio_unitario",
      headerName: "Precio",
      flex: 0.6,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        params.row.id === "total" ? (
          <Typography color={colors.brown[100]}>
            {params.row.precio_unitario}
          </Typography>
        ) : (
          <Typography>
            $ {params.row.precio_unitario}
          </Typography>
        ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        if (params.row.id === "total") {
          return <Typography color={colors.brown[100]}>$ {total}</Typography>;
        } else {
          return <Typography> {params.value}</Typography>;
        }
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        params.row.id === "total" ? null : (
          <>            
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteClick(params)}
            >
              Eliminar
            </Button>
          </>
        )
      ),
    },
    
  ];

  return (
    <Box m="30px" display="grid">
      <Header title="Inventario " subtitle="Maneja el inventario desde aquí" />
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
            backgroundColor: colors.green[800],
          },
        }}
      >
        <DataGrid
          rows={inventario}
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
  <Button type="submit" color="secondary" variant="contained"
  component={Link}
  to={`/newMat`}
  style={{marginRight: "25px"}}
  >
    Crear Material
  </Button>
  <Button
    variant="contained"
    color="primary"
    component={Link}
    to={`/inventario/edit`}
  >
    Editar Material
  </Button>
</div>

    </Box>
  );
};

export default Inventario;
