import httpService from "./httpService";

export const getProducts = async () => {
  const response = await httpService.get("/products");
  return response.data.products;
};
