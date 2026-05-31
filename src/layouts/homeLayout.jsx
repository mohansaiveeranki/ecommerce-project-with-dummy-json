import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
const HomeLayout = ({ children, count, page, onChange }) => {
  return (
    <Box>
      <Navbar />
      {children}
      <Pagination count={count} page={page} onChange={onChange} />
    </Box>
  );
};

export default HomeLayout;
