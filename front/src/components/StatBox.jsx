import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";


const StatBox = ({ title, subtitle, icon}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.brown[500] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.gray[900] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;