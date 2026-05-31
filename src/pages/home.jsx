import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import HomePageLayout from "../layouts/homeLayout";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  // Loading
  // Data Fetching
  // Error Handling
  const fetchProducts = async () => {
    try {
      const { products: fetchProducts, total } = await getProducts({
        limit: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
      });
      //   console.log("Fetched Products:", total, fetchProducts);
      setProducts(fetchProducts);
      setTotalCount(total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  //   if (loading) {
  //     return (
  //       <HomePageLayout count={0} page={1} onChange={() => {}}>
  //         <Loader />
  //       </HomePageLayout>
  //     );
  //   }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (event, value) => {
    // console.log("Page changed to:", value, "Event:", event);
    setPage(value);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  return (
    <HomePageLayout count={totalPages} page={page} onChange={handlePageChange}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </HomePageLayout>
  );
};

export default Home;
