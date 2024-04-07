import axiosClient from "@/axios";
import { ref } from "vue";

const SizesServices = (error) => {
  const sizes = ref([]);

  const getSizes = async () => {
    try {
      const response = await axiosClient.get("/sizes");
      sizes.value = await response.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    sizes,
    getSizes,
  };
};

export default SizesServices;
