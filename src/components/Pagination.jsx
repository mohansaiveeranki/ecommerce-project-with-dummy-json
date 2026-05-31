import { Pagination as MuiPagination, Box } from "@mui/material";
// import Stack from "@mui/material/Stack";

export default function Pagination({ count, page, onChange }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 18,
        left: "50%",
        transform: "translateX(-30%)",
        zIndex: 1000,
      }}
    >
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}
