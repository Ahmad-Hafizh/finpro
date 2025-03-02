import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#57CC99", light: "#80ED99", dark: "#38A3A5" },
    secondary: { main: "#22577A" },
    background: { default: "#f7f9fc", paper: "#ffffff" },
    success: { main: "#4CAF50" },
    warning: { main: "#FF9800" },
    error: { main: "#F44336" },
    info: { main: "#2196F3" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.05)" },
      },
    },
  },
});

export default theme;
