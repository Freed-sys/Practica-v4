import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Form from "../formInventario";
import axios from "axios";
import { useEffect, useState } from "react";
import "../global/App.css";
import clienteAxios from "../../helpers/clienteAxios";
import EditInv from "../formInventario/editInventario";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Inventario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null); // establecemos null como valor inicial

  const [inventario, setInventario] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState(null);

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarInv")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const inventario = response.data.map((element) => ({
            ...element,
            id: element.id, // add the ID field using the value of the _id field
            total: element.precio_unitario * element.cant_mat,
          }));
          const total = inventario.reduce(
            (accumulator, currentValue) => accumulator + currentValue.total,
            0
          );
          setInventario([
            ...inventario,
            {
              id: "",
              nombre_mat: "",
              tipo_mat: "",
              cant_mat: "",
              unidad_mat: "",
              precio_unitario: "",
              total: total,
            },
          ]);
          setTotal(total);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleData = (response) => {
    console.log(response.data);
    setData(data); // actualizamos el estado con la nueva información
  }

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
      field: "id",
      headerName: "ID",
      flex: 1,
      cellClassName: "id-column--cell",
      valueGetter: (params) => params.row.id,
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.id}</Typography>
      ),
    },
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
      headerName: "Cantidad Material",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>{params.row.cant_mat}</Typography>
      ),
    },
    {
      field: "unidad_mat",
      headerName: "Unidad de Medida",
      flex: 1,
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
      flex: 1,
      cellCLassName: "name-column--cell",
      renderCell: (params) => (
        <Typography color={colors.brown[100]}>
          {" "}
          $ {params.row.precio_unitario}
        </Typography>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        params.row.id === "total" ? (
          <Typography color={colors.brown[100]}>
            $ {params.row.total}
          </Typography>
        ) : null,
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
            color="primary"
            component={Link}
            to={`/inventario/editar/`}
            onClick={() => handleData()}
          >
            Editar
          </Button>
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
        >
          Crear Material
        </Button>
      </div>
    </Box>
  );
};

export default Inventario;
