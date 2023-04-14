import { Typography, Box } from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from '@mui/material/styles';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.gray[900]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.gray[900]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;