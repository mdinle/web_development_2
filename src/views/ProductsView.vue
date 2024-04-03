<template>
  <div class="min-h-full">
    <NavigationBar :navigation="navigation" :userNavigation="userNavigation" :user="user" />
    <Header> </Header>
    <main>
      <AddProduct />
      <ProductTable />
    </main>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import Header from '@/components/Dashboard/Header.vue';
import ProductTable from '@/components/Products/ProductsTable.vue';
import AddProduct from '@/components/Products/AddProduct.vue';
import { useStore } from 'vuex';
import { ref, onMounted, toRaw } from 'vue';

const navigation = ref([
  { name: 'Dashboard', href: '/', current: false },
  { name: 'Manage Orders', href: '#', current: false },
  { name: 'Manage Products', href: '/products', current: true },
  { name: 'Manage Inventory', href: '#', current: false },
]);
const userNavigation = ref([
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]);
const store = useStore();
const user = ref({});

onMounted(() => {
  user.value = store.state.user.data;
  console.log('User data:', toRaw(user.value));
});
</script>