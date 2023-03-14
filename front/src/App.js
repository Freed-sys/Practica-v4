import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Inventario from "./scenes/inventario";
import { Routes, Route } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Personal from "./scenes/Personal";
import Form from "./scenes/formInventario";
import FormUM from "./scenes/formUmedida";
import Dashboard from "./scenes/dashboard";
import Sidebarr from "./scenes/global/Sidebar";
import "././scenes/global/App.css";
import { tokens } from "./theme";
import "./scenes/global/App.css";
import Obras from "./scenes/obras";
import Clientes from "./scenes/clientes";
import FormCli from "./scenes/formClientes";
import FormTra from "./scenes/formTrabajadores";
import FormObra from "./scenes/formObras";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Topbar />
      <div className="App">
        <div className="side1">
          <Sidebarr />
        </div>

        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/newMat" element={<Form />} />
            <Route path="/obras" element={<Obras />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/materialNew" element={<FormUM />} />
            <Route path="/cliente/new" element={<FormCli />} />
            <Route path="/trabajador/new" element={<FormTra />} />
            <Route path="/obra/new" element={<FormObra />} />
            
          </Routes>
        </div>
      </div>
    </ColorModeContext.Provider>
  );
}

export default App;
