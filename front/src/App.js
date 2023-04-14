import {useState, useEffect} from "react";
import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Inventario from "./scenes/inventario";
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Personal from "./scenes/Personal";
import Form from "./scenes/formInventario";
import FormUM from "./scenes/formUmedida";
import Dashboard from "./scenes/dashboard";
import Sidebarr from "./scenes/global/Sidebar";
import "././scenes/global/App.css";
import {tokens} from "./theme";
import "./scenes/global/App.css";
import Obras from "./scenes/obras";
import Clientes from "./scenes/clientes";
import FormCli from "./scenes/formClientes";
import FormTra from "./scenes/formTrabajadores";
import FormObra from "./scenes/formObras";
import FormVar from "./scenes/formVariantes";
import OrdenPDF from "./scenes/PDF'S/ordenPDF";
import Login from "./scenes/login/SignIn";
import Variante from "./scenes/variantes";
import EditInv from "./scenes/formInventario/editInventario";
import EditCli from "./scenes/formClientes/editClientes";
import EditTra from "./scenes/formTrabajadores/editTrabajadores";
import EditObra from "./scenes/formObras/editObra";
import FormEstado from "./scenes/formEstado";
import Register from "./scenes/dashboard/register";
import {AuthProvider} from "./helpers/authContext";

import PrivateRoutes from "./context/PrivateRoute";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Topbar />
          <div className="App">
            <div className="side1">
              <Sidebarr />
            </div>
            <div className="container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoutes />}>
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
                  <Route path="/registrar/new" element={<Register />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}
export default App;