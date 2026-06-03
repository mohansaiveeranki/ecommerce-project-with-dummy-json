import { Pagination as MuiPagination, Box } from "@mui/material";

export default function Pagination({ count, page, onChange }) {
  if (!count || count <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        bgcolor: "rgba(255, 255, 255, 0.92)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        borderRadius: 2,
        p: 1,
        backdropFilter: "blur(14px)",
        maxWidth: "calc(100vw - 24px)",
        overflowX: "auto",
      }}
    >
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        color="primary"
        shape="rounded"
        siblingCount={0}
      />
    </Box>
  );
}
