import { useState } from "react";
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

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // state para saber si el usuario ha iniciado sesión

  function handleLogin() {
    setIsLoggedIn(true); // actualiza el state para indicar que el usuario ha iniciado sesión exitosamente
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      
      <Topbar />
      <div className="App">
        {isLoggedIn ? ( // si el usuario ha iniciado sesión, mostrar el contenido de la aplicación
          <>
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
                <Route path="/variante/new" element={<FormVar />} />
                <Route path="/pdfOrden" element={<OrdenPDF />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Si se introduce una ruta no válida, redirigir al dashboard */}
              </Routes>
            </div>
          </>
        ) : ( // si el usuario no ha iniciado sesión, mostrar el formulario de login
          <Login onLogin={handleLogin} />
        )}
      </div>
    </ColorModeContext.Provider>
  );
}

export default App;
