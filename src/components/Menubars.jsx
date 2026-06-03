import { useState, useEffect } from "react";
import { getCategories } from "../service/productService";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

const formatCategoryLabel = (category) =>
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function Menubars({ onCategorySelect, selectedCategory = "all" }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const buttonLabel =
    selectedCategory === "all"
      ? "Categories"
      : formatCategoryLabel(selectedCategory);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories into UI:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <PopupState variant="popover" popupId="category-dropdown-menu">
      {(popupState) => (
        <>
          <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            {...bindTrigger(popupState)}
            sx={{
              flexShrink: 0,
              bgcolor: "background.paper",
              borderColor: "rgba(15, 23, 42, 0.14)",
              color: "text.primary",
              minWidth: { xs: "100%", sm: 170 },
              justifyContent: "space-between",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "background.paper",
              },
            }}
          >
            {loading ? "Loading..." : buttonLabel}
          </Button>
          <Menu
            {...bindMenu(popupState)}
            PaperProps={{
              sx: {
                mt: 1,
                maxHeight: 380,
                width: 240,
                border: "1px solid rgba(15, 23, 42, 0.08)",
                boxShadow: "0 18px 40px rgba(15, 23, 42, 0.14)",
              },
            }}
          >
            <MenuItem
              selected={selectedCategory === "all"}
              onClick={() => {
                popupState.close();
                if (onCategorySelect) onCategorySelect("all");
              }}
            >
              All Products
            </MenuItem>

            {categories.map((category) => (
              <MenuItem
                key={category}
                selected={selectedCategory === category}
                onClick={() => {
                  popupState.close();
                  if (onCategorySelect) onCategorySelect(category);
                }}
              >
                {formatCategoryLabel(category)}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
