<template>
  <div class="grid gap-4 lg:gap-8 md:grid-cols-3 p-8">
    <div class="relative p-6 rounded-2xl bg-green-500 shadow">
      <div class="space-y-2">
        <div class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          <span>Active Users</span>
        </div>
        <div class="text-3xl text-white">{{ activeUsers }}</div>
      </div>
    </div>

    <div class="relative p-6 rounded-2xl bg-white shadow ">
      <div class="space-y-2">
        <div class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500">
          <span>New customers</span>
        </div>

        <div class="text-3xl">1340</div>

        <div class="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">
          <span>3% decrease</span>

          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fill-rule="evenodd"
              d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="relative p-6 rounded-2xl bg-red-500 shadow">
      <div class="space-y-2">
        <div class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>

          <span>Low On Stock</span>
        </div>

        <div class="text-3xl text-white">{{ productBrand }} {{ productName }} Size: {{productSize}} </div>

        <div class="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-white">
          <span>{{ productStock }} left</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUsersStore } from '@/store/UsersStore';
import { useProductsStore } from '@/store/ProductsStore';
import { onMounted, ref } from 'vue';

const usersStore = useUsersStore();
const productsStore = useProductsStore();

const activeUsers = ref(null);
const lowestStock = ref(null);

const productBrand = ref(null);
const productName = ref(null);
const productStock = ref(null);
const productSize = ref(null);


onMounted(async () => {
  await usersStore.fetchUsers();
  await productsStore.fetchProducts();

  activeUsers.value = usersStore.getActiveUsers;
  lowestStock.value = productsStore.getLowestStock;

  productBrand.value = lowestStock.value.brand.brand_name;
  productName.value = lowestStock.value.name;
  productStock.value = lowestStock.value.stock;
  productSize.value = lowestStock.value.size.size_name;

});
</script>