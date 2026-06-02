import httpService from "./httpService";
import { ENDPOINTS } from "./endpoints";

export const getProducts = async ({ limit = 10, skip = 0 }) => {
  const response = await httpService.get(
    `${ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`,
  );
  return {
    products: response.data.products,
    total: response.data.total,
  };
};

export const getProductsByCategory = async (
  category,
  { limit = 10, skip = 0 } = {},
) => {
  const safeCategory = encodeURIComponent(category);
  const response = await httpService.get(
    `${ENDPOINTS.PRODUCTS_BY_CATEGORY}/${safeCategory}?limit=${limit}&skip=${skip}`,
  );
  return {
    products: response.data.products,
    total: response.data.total,
  };
};

export const searchProducts = async (query) => {
  const safeQuery = encodeURIComponent(query);
  const response = await httpService.get(
    `${ENDPOINTS.PRODUCTS_SEARCH}${safeQuery}`,
  );
  return {
    products: response.data.products,
    total: response.data.total,
  };
};

export const getCategories = async () => {
  const response = await httpService.get(ENDPOINTS.CATEGORIES);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await httpService.get(`${ENDPOINTS.PRODUCTS}/${id}`);
  return response.data;
};
