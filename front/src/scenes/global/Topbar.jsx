import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@material-ui/core/Button";
import clienteAxios from "../../helpers/clienteAxios";
import { setToken, getToken, deleteToken } from "../../helpers/usuario";
import { AuthContext } from "../../helpers/authContext"; // importar el authContext
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useContext(AuthContext); // obtener la función logout del authContext

  const handleLogout = () => {
    clienteAxios
      .post("/api/logout")
      .then(() => {
        deleteToken();
        logout(); // llamar a la función logout del authContext
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="logo">
      {/*barra busqueda */}
      <img
        src="https://i.postimg.cc/YqwzWnxh/79b1e621-7037-4257-ba5b-132dc001973a-2.jpg"
        alt="Logo"
      />
      <div className="session_out">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#7a5433" }}
          onClick={() => {
            handleLogout();
            handleClearStorage();
          }}
          component={Link}
          to={`/`}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
