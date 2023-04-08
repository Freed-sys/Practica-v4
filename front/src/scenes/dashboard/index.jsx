import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import PersonIcon from "@mui/icons-material/Person";
import StatBox from "../../components/StatBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import clienteAxios from "../../helpers/clienteAxios";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import "../global/App.css";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventarios, setInventarios] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [obras, setObras] = useState([]);

  useEffect(() => {
    clienteAxios
      .get("api/mostrarTra")
      .then((response) => {
        setPersonal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    clienteAxios
      .get("api/mostrarOrden")
      .then((response) => {
        setObras(response.data);
        console.log(obras);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    clienteAxios
      .get("/api/mostrarInv")
      .then((response) => {
        setInventarios(response.data);
        console.log(response.data); // Agregar console.log aquí
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Box m="20px">
      <div className="dashboardHeader">
        <Header
          title="Página de Inicio"
          subtitle="Bienvenido a Casas Antilhue"
        />
      </div>
      {/* GRID  Y CHARTS*/}
      <div className="dashboardGrid">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          margin="2px"
        >
          {/* ROW 1*/}
          <Box
            backgroundColor={colors.green[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginRight="3px"
          >
            {/* RELLENAR CON DATOS MATERIALES BDD */}
            <StatBox
              title={inventarios.length}
              subtitle="Materiales Activos"
              icon={
                <InventoryIcon
                  sx={{
                    color: colors.brown[500],
                    fontSize: "20px",
                  }}
                />
              }
            />
            <Box
              backgroundColor={colors.green[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginLeft="2px"
            >
              {/* RELLENAR CON DATOS MATERIALES BDD */}
              <StatBox
                title={personal.length}
                subtitle="Personal Activo"
                icon={
                  <PersonIcon
                    sx={{
                      color: colors.brown[500],
                      fontSize: "20px",
                    }}
                  />
                }
              />
              <Box
                backgroundColor={colors.green[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginLeft="5px"
              >
                {/* RELLENAR CON DATOS MATERIALES BDD */}
                <StatBox
                  title={obras.length}
                  subtitle="Obras Activas"
                  icon={
                    <HomeRepairServiceIcon
                      sx={{
                        color: colors.brown[500],
                        fontSize: "20px",
                      }}
                    />
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Dashboard;
