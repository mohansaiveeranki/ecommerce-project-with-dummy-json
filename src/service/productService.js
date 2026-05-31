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
