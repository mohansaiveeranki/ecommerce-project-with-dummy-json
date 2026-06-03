import { useState, useEffect } from "react";
import { Box, Stack, Typography, Chip } from "@mui/material";

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

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (event, value) => {
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
      <Box sx={{ maxWidth: 1240, mx: "auto" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          gap={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: "primary.dark" }}>
              Fresh catalog
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontSize: { xs: 28, sm: 34, md: 40 } }}
            >
              Shop products that fit your day
            </Typography>
          </Box>
          <Chip
            label={`${totalCount} products`}
            sx={{
              bgcolor: "background.paper",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              fontWeight: 700,
            }}
          />
        </Stack>

        {loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: { xs: 2, sm: 2.5, md: 3 },
              "@media (min-width: 480px)": {
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              },
              "@media (min-width: 720px)": {
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              },
              "@media (min-width: 920px)": {
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              },
              "@media (min-width: 1280px)": {
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              },
            }}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            ) : (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  bgcolor: "background.paper",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  borderRadius: 2,
                  py: 8,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">No products found</Typography>
                <Typography color="text.secondary">
                  Try a different search or category.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </HomePageLayout>
  );
};

export default Home;
