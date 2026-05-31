import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Pagination from "../components/PaginationCard";
const HomeLayout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      {children}
      <Pagination />
    </Box>
  );
};

export default HomeLayout;
