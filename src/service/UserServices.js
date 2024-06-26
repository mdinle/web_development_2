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

  const getUser = async (id) => {
    try {
      const response = await axiosClient.get(`/user?userId=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const createUser = async (user) => {
    try {
      const response = await axiosClient.post('/create-user', user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axiosClient.delete(`/delete-user?userId=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const updateUser = async (user) => {
    try {
      const response = await axiosClient.put('/update-user', user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  return {
    users,
    getUsers,
    createUser,
    deleteUser,
    getUser,
    updateUser,
  };
};

export default UserServices;
