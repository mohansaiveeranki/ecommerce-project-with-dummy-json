import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Menubars from "./Menubars";

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
          <Button
            variant="contained"
            sx={{
              display: { xs: "none", md: "inline-flex" },
              ml: 1,
              bgcolor: "text.primary",
              "&:hover": { bgcolor: "#2a3431" },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
