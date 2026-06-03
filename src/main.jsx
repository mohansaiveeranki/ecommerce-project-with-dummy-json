import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f766e",
      dark: "#115e59",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f59e0b",
    },
    background: {
      default: "#f7f8f6",
      paper: "#ffffff",
    },
    text: {
      primary: "#17211f",
      secondary: "#66736f",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: 0 },
    h2: { fontWeight: 800, letterSpacing: 0 },
    h3: { fontWeight: 800, letterSpacing: 0 },
    h4: { fontWeight: 700, letterSpacing: 0 },
    h5: { fontWeight: 700, letterSpacing: 0 },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
