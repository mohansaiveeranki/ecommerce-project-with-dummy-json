import { useState, useEffect } from "react";
import { getCategories } from "../service/productService";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
          <Button variant="contained" {...bindTrigger(popupState)}>
            {loading ? "Loading..." : buttonLabel}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                popupState.close();
                if (onCategorySelect) onCategorySelect("all");
              }}
            >
              All Products
            </MenuItem>

            {categories.map((category, index) => (
              <MenuItem
                key={index}
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
