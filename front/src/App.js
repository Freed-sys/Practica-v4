import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Inventario from "./scenes/inventario";
import { Routes, Route, Navigate } from "react-router-dom";
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
import FormVar from "./scenes/formVariantes";
import OrdenPDF from "./scenes/PDF'S/ordenPDF";
import Login from "./scenes/login/SignIn";
import { getToken } from "./helpers/usuario";
import { Skeleton } from "@mui/material";
import Variante from "./scenes/variantes";
import EditInv from "./scenes/formInventario/editInventario";
import EditCli from "./scenes/formClientes/editClientes";
import EditTra from "./scenes/formTrabajadores/editTrabajadores";
import EditObra from "./scenes/formObras/editObra";
import FormEstado from "./scenes/formEstado";


function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  // Estado para comprobar si el usuario ha iniciado sesión
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    const token = getToken();
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        {/* Verificar si el usuario ha iniciado sesión */}
        {loggedIn ? (
          <>
            <Topbar />
            <div className="App">
              <div className="side1">
                <Sidebarr />
              </div>
              <div className="container">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route path="/inventario/edit" element={<EditInv />} />
                  <Route path="/personal" element={<Personal />} />
                  <Route path="/newMat" element={<Form />} />
                  <Route path="/obras" element={<Obras />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/cliente/edit" element={<EditCli />} />
                  <Route path="/variantes" element={<Variante />} />
                  <Route path="/materialNew" element={<FormUM />} />
                  <Route path="/cliente/new" element={<FormCli />} />
                  <Route path="/trabajador/new" element={<FormTra />} />
                  <Route path="/trabajador/edit" element={<EditTra />} />
                  <Route path="/obra/new" element={<FormObra />} />
                  <Route path="/obra/edit" element={<EditObra />} />
                  <Route path="/variante/new" element={<FormVar />} />
                  <Route path="/pdfOrden" element={<OrdenPDF />} />
                  <Route path="/estado/new" element={<FormEstado />} />
                  <Route path="*" element={<Navigate to="/" />} /> {/* Si se introduce una ruta no válida, redirigir al dashboard */}
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
