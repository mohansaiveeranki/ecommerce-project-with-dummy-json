import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAuth } from "../context/authContext";

const AuthPage = ({ mode }) => {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    try {
      if (isRegister) {
        if (formValues.password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }

        if (formValues.password !== formValues.confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        register(formValues);
      } else {
        login(formValues);
      }

      navigate("/");
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 7 },
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(180deg, rgba(247, 248, 246, 1) 0%, rgba(238, 243, 240, 1) 100%)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 460,
          p: { xs: 3, sm: 4 },
          border: "1px solid rgba(15, 23, 42, 0.08)",
          borderRadius: 2,
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<StorefrontIcon />}
              sx={{ px: 0, mb: 2 }}
            >
              MarketNest
            </Button>
            <Typography variant="h4" component="h1">
              {isRegister ? "Create account" : "Welcome back"}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {isRegister
                ? "Register to save your cart and checkout faster."
                : "Log in to continue shopping your saved picks."}
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {isRegister && (
                <TextField
                  label="Full name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              )}
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                required
                fullWidth
              />
              {isRegister && (
                <TextField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              )}
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={isRegister ? <PersonAddIcon /> : <LoginIcon />}
              >
                {isRegister ? "Create account" : "Log in"}
              </Button>
            </Stack>
          </Box>

          <Typography color="text.secondary" textAlign="center">
            {isRegister ? "Already registered?" : "New to MarketNest?"}{" "}
            <Link
              component={RouterLink}
              to={isRegister ? "/login" : "/register"}
              fontWeight={800}
            >
              {isRegister ? "Log in" : "Create an account"}
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AuthPage;
