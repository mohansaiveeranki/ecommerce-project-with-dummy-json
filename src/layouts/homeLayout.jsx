import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
const HomeLayout = ({
  children,
  count,
  page,
  onChange,
  onSearch,
  onCategorySelect,
  selectedCategory,
}) => {
  return (
    <Box>
      <Navbar
        onSearch={onSearch}
        onCategorySelect={onCategorySelect}
        selectedCategory={selectedCategory}
      />
      <Box sx={{ pt: 14 }}>{children}</Box>
      <Pagination count={count} page={page} onChange={onChange} />
    </Box>
  );
};

export default HomeLayout;
