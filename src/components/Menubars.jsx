import { useState, useEffect } from "react";
import { getCategories } from "../service/productService";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export default function Menubars({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
            {loading ? "Loading..." : "Categories"}
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
