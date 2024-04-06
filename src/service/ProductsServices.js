import axiosClient from "@/axios";
import { ref } from "vue";

const ProductServices = (error) => {
  const products = ref([]);

  const getProducts = async () => {
    try {
      const response = await axiosClient.get("/products");
      products.value = await response.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  // const getProduct = async (id) => {
  //     try {
  //     const response = await axiosClient.get(`/products/${id}`);
  //     return response.data;
  //     } catch (error) {
  //     console.log(error);
  //     }
  // };

  // const createProduct = async (data) => {
  //     try {
  //     const response = await axiosClient.post("/products", data);
  //     return response.data;
  //     } catch (error) {
  //     console.log(error);
  //     }
  // };

  // const updateProduct = async (id, data) => {
  //     try {
  //     const response = await axiosClient.put(`/products/${id}`, data);
  //     return response.data;
  //     } catch (error) {
  //     console.log(error);
  //     }
  // };

  // const deleteProduct = async (id) => {
  //     try {
  //     const response = await axiosClient.delete(`/products/${id}`);
  //     return response.data;
  //     } catch (error) {
  //     console.log(error);
  //     }
  // };

  return {
    products,
    getProducts,
  };
};

export default ProductServices;
