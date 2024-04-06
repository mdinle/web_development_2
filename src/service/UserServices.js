import axiosClient from "@/axios";
import { ref } from "vue";

const UserServices = (error) => {
  const users = ref([]);

  const getUsers = async () => {
    try {
      const response = await axiosClient.get("/users");
      users.value = await response.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    users,
    getUsers,
  };
};

export default UserServices;
