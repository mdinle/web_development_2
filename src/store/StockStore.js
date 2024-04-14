import { defineStore } from "pinia";
import axiosClient from "@/axios";
import { ref } from "vue";

export const useStockStore = defineStore("StockStore", {
  state: () => ({
    stocks: ref([]),
    history: ref([]),
  }),
  actions: {
    async fetchStocks() {
      try {
        const response = await axiosClient.get("/stocks");
        console.log(response.data);
        this.stocks = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchStockHistory() {
        try {
            const response = await axiosClient.get("/stock-history");
            this.history = response.data;
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async createStock(stock) {
      try {
        const response = await axiosClient.post("/stock", stock);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async updateStock(stock) {
      try {
        const response = await axiosClient.put("/stock", stock);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async addEditStock(stock) {
      await this.fetchStocks();
      const index = this.stocks.findIndex(
        (s) =>
          s.product.id === stock.stock[0].product_id &&
          s.size.size_id === stock.stock[0].size_id
      );

      if (index === -1) {
        console.log("Create stock", stock.stock[0]);
        await this.createStock(stock.stock[0])
          .then(() => {
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      } else {
        console.log("Update stock", stock.stock[0]);
        await this.updateStock(stock.stock[0])
          .then(() => {
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      }
    },
  },
});
