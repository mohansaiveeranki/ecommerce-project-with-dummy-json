import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../service/productService";
import { Box, Typography, Button, Grid } from "@mui/material";
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
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 4, maxWidth: "1200px", margin: "0 auto" }}>
      <Button onClick={() => navigate("/")} variant="outlined" sx={{ mb: 4 }}>
        ← Back to Catalog
      </Button>

      <Grid container spacing={4}>
        {/* Left Side: Product Showcase Images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
            }}
          >
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              style={{ width: "100%", display: "block" }}
            />
          </Box>
        </Grid>

        {/* Right Side: Total Deep Information Breakdown */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            {product.category?.toUpperCase()}
          </Typography>
          <Typography variant="h3" sx={{ mb: 1, fontWeight: "bold" }}>
            {product.title}
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            sx={{ mb: 3, fontWeight: "500" }}
          >
            ${product.price}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.7 }}
          >
            {product.description}
          </Typography>

          {/* Deep Extended Attributes */}
          <Box sx={{ bgcolor: "action.hover", p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Brand:</b> {product.brand || "Generic"}
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Rating:</b> ⭐ {product.rating} / 5
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Stock Availability:</b> {product.stock} units remaining
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              <b>Warranty Info:</b>{" "}
              {product.warrantyInformation || "Standard 1 Year"}
            </Typography>
            <Typography variant="subtitle2">
              <b>Shipping Policy:</b>{" "}
              {product.shippingInformation || "Free Shipping"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailPage;
