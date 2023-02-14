import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/dataExample";
import PersonIcon from "@mui/icons-material/Person";
import StatBox from "../../components/StatBox";
import { palette } from "@mui/system";
import DownloadIcon from "@mui/icons-material/Download";
import InventoryIcon from "@mui/icons-material/Inventory";
import { mockDataPerson } from "../../data/dataPersonEx";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import "../global/App.css";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <div className="dashboardHeader">
        <Header
          title="Página de Inicio"
          subtitle="Bienvenido a Casas Antilhue"
        />
      </div>
      <Box>
        <Button
          sx={{
            backgroundColor: colors.brown[700],
            color: colors.gray[100],
            fontSize: "14px",
            padding: "10px",
            fontWeight: "bold",
            fontFamily: "Roboto",
            marginBottom: "2%",
          }}
        >
          <DownloadIcon sx={{ mr: "10px" }} />
          Descargar Resumen
        </Button>
      </Box>
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
              title="3"
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
                title="10"
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
                  title="20"
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
