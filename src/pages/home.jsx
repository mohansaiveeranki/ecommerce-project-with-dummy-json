import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import HomePageLayout from "../layouts/homeLayout";
import { getProducts, searchProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  // Loading
  // Data Fetching
  // Error Handling
  const fetchProducts = async () => {
    setProducts([]);
    setLoading(true);
    try {
      if (searchQuery.trim() !== "") {
        const response = await searchProducts(searchQuery);
        const filteredProducts = response.products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setProducts(filteredProducts);
        setTotalCount(filteredProducts.length);
      } else {
        const response = await getProducts({
          limit: itemsPerPage,
          skip: (page - 1) * itemsPerPage,
        });
        setProducts(response.products);
        setTotalCount(response.total);
      }
      //   console.log("Fetched Products:", total, fetchProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery]);
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
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };
  return (
    <HomePageLayout
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      onSearch={handleSearch}
    >
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
