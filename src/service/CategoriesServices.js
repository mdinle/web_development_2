import axiosClient from "@/axios";
import { ref } from "vue";

const CategoriesService = (error) => {
  const categories = ref([]);

  const getCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      categories.value = await response.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    categories,
    getCategories,
  };
};

export default CategoriesService;
