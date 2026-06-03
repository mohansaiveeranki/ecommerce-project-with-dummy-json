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
    <Box sx={{ minHeight: "100vh", pb: 12 }}>
      <Navbar
        onSearch={onSearch}
        onCategorySelect={onCategorySelect}
        selectedCategory={selectedCategory}
      />
      <Box sx={{ pt: { xs: 18, sm: 14, md: 13 }, px: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
      <Pagination count={count} page={page} onChange={onChange} />
    </Box>
  );
};

export default HomeLayout;
