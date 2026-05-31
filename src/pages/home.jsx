import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import HomePageLayout from "../layouts/homeLayout";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Loading
  // Data Fetching
  // Error Handling
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products:", products);
  return (
    <HomePageLayout>
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            {/* <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> */}
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </HomePageLayout>
  );
};

export default Home;
