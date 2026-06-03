import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../service/productService";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  Rating,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShieldIcon from "@mui/icons-material/Shield";
import Loader from "../components/Loader";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchfullProductDetails = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchfullProductDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(247, 248, 246, 1) 0%, rgba(238, 243, 240, 1) 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, bgcolor: "background.paper" }}
        >
          Back to catalog
        </Button>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            bgcolor: "background.paper",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: 2,
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#eef3f0",
                aspectRatio: { xs: "4 / 3", sm: "1 / 1" },
                display: "grid",
                placeItems: "center",
                p: { xs: 2, md: 4 },
              }}
            >
              <img
                src={product.images?.[0] || product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Chip
              label={product.category}
              sx={{
                mb: 2,
                bgcolor: "#e6f4f1",
                color: "primary.dark",
                fontWeight: 800,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                mb: 1,
                fontWeight: "bold",
                fontSize: { xs: 30, sm: 34, md: 46 },
              }}
            >
              {product.title}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2, flexWrap: "wrap" }}
            >
              <Rating value={product.rating || 0} precision={0.5} readOnly />
              <Typography color="text.secondary">{product.rating} / 5</Typography>
            </Stack>
            <Typography
              variant="h4"
              color="primary"
              sx={{ mb: 3, fontWeight: 800, fontSize: { xs: 30, sm: 32, md: 34 } }}
            >
              ${product.price}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.8 }}
            >
              {product.description}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mb: 3 }}
            >
              <Button variant="contained" size="large" sx={{ flex: 1 }}>
                Add to cart
              </Button>
              <Button variant="outlined" size="large" sx={{ flex: 1 }}>
                Buy now
              </Button>
            </Stack>

            <Box
              sx={{
                bgcolor: "#f7f8f6",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                p: 3,
                borderRadius: 2,
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" gap={2}>
                  <Typography color="text.secondary">Brand</Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    {product.brand || "Generic"}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" gap={2}>
                  <Typography color="text.secondary">Stock</Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    {product.stock} units remaining
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" gap={1.5}>
                  <ShieldIcon color="primary" />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Warranty</Typography>
                    <Typography color="text.secondary">
                      {product.warrantyInformation || "Standard 1 Year"}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" gap={1.5}>
                  <LocalShippingIcon color="primary" />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Shipping</Typography>
                    <Typography color="text.secondary">
                      {product.shippingInformation || "Free Shipping"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
