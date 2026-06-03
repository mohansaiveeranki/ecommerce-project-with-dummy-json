import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Menubars from "./Menubars";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  border: `1px solid ${alpha(theme.palette.primary.dark, 0.12)}`,
  color: theme.palette.text.primary,
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: 420,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.25, 1.5, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function Navbar({ onSearch, onCategorySelect, selectedCategory }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  const handleSetQuery = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(247, 248, 246, 0.92)",
          color: "text.primary",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1240,
            width: "100%",
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.25 },
            gap: { xs: 1, sm: 2 },
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <IconButton
            component={RouterLink}
            to="/"
            size="large"
            edge="start"
            aria-label="Go home"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <StorefrontIcon />
          </IconButton>

          <Box sx={{ minWidth: { xs: 0, sm: 150 }, flex: { xs: 1, sm: "initial" } }}>
            <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1 }}>
              MarketNest
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
            >
              Curated everyday finds
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1.5,
              width: { xs: "100%", md: "auto" },
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search products"
                inputProps={{ "aria-label": "search" }}
                value={query}
                onChange={handleSetQuery}
                onKeyDown={handleKeyDown}
              />
            </Search>
            <Menubars
              onCategorySelect={onCategorySelect}
              selectedCategory={selectedCategory}
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: { md: 1 }, width: { xs: "100%", md: "auto" } }}
          >
            <IconButton
              component={RouterLink}
              to="/cart"
              aria-label={`Open cart with ${itemCount} items`}
              sx={{
                bgcolor: "background.paper",
                border: "1px solid rgba(15, 23, 42, 0.12)",
                "&:hover": { bgcolor: "#eef3f0" },
              }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isAuthenticated ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", lg: "block" },
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "text.secondary",
                  }}
                >
                  Hi, {currentUser.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  sx={{
                    flex: { xs: 1, md: "initial" },
                    bgcolor: "text.primary",
                    "&:hover": { bgcolor: "#2a3431" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  sx={{
                    flex: { xs: 1, md: "initial" },
                    bgcolor: "text.primary",
                    "&:hover": { bgcolor: "#2a3431" },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    bgcolor: "background.paper",
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
