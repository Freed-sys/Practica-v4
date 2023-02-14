import { Box, IconButton, useTheme} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/*barra busqueda */}
            <Box 
            display="flex" 
            backgroundColor={colors.green[400]} 
            borderRadius="3px">
                <InputBase sx={{ml: 2, flex: 1}} placeholder="search " />
                <IconButton type="button" sx={{p: 1}} >
                    <SearchOutlinedIcon />
                </IconButton>
            </Box>

            {/*iconos*/}
            <Box display="flex">
                {/*<IconButton onClick={colorMode.toggleColorMode} >
                    {theme.palette.mode === 'dark' ?(
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    ) }
                </IconButton>
                    */}
                <IconButton>
                    <NotificationsActiveOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <Person4OutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    )
};
export default Topbar;