import axiosClient from "@/axios";
import { ref } from "vue";

const BrandsServices = (error) => {
  const brands = ref([]);

  const getBrands = async () => {
    try {
      const response = await axiosClient.get("/brands");
      brands.value = await response.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    brands,
    getBrands,
  };
};

export default BrandsServices;
