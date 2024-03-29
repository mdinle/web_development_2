<template>
  <div class="min-h-full">
    <NavigationBar :navigation="navigation" :userNavigation="userNavigation" :user="user" />
    <Header> </Header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div class=" text-center p-12">
          <p class="font-bold">Welcome to the dashboard. {{ user.username }} !</p>
          <br>
       <p>Here you can manage your orders, products, and inventory.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import Header from '@/components/Dashboard/Header.vue';
import { useStore } from 'vuex';
import { ref, onMounted, toRaw } from 'vue';

const navigation = ref([
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Manage Orders', href: '#', current: false },
  { name: 'Manage Products', href: '/products', current: false },
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
