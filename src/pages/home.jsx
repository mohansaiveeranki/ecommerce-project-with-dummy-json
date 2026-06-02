import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import HomePageLayout from "../layouts/homeLayout";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../service/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 10;

  useEffect(() => {
    let isCurrentRequest = true;

    const loadProducts = async () => {
      try {
        const trimmedSearchQuery = searchQuery.trim();
        let response;

        if (trimmedSearchQuery !== "") {
          response = await searchProducts(trimmedSearchQuery);
          const filteredProducts = response.products.filter(
            (product) =>
              selectedCategory === "all" ||
              product.category === selectedCategory,
          );

          if (isCurrentRequest) {
            setProducts(filteredProducts);
            setTotalCount(filteredProducts.length);
          }
          return;
        }

        if (selectedCategory !== "all") {
          response = await getProductsByCategory(selectedCategory, {
            limit: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
          });
        } else {
          response = await getProducts({
            limit: itemsPerPage,
            skip: (page - 1) * itemsPerPage,
          });
        }

        if (isCurrentRequest) {
          setProducts(response.products);
          setTotalCount(response.total);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isCurrentRequest) {
          setProducts([]);
          setTotalCount(0);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isCurrentRequest = false;
    };
  }, [page, searchQuery, selectedCategory]);
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
    setLoading(true);
    setPage(value);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  const handleSearch = (query) => {
    setLoading(true);
    setSearchQuery(query);
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <HomePageLayout
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      onSearch={handleSearch}
      onCategorySelect={handleCategorySelect}
      selectedCategory={selectedCategory}
    >
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No products found.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </HomePageLayout>
  );
};

export default Home;
