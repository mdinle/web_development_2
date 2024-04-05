<template>
  <div class="flex h-screen">
    <NavigationBar />
    <div class="flex flex-col w-full">
      <Header />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Dashboard/Header.vue";
import NavigationBar from "@/components/Dashboard/NavigationBar.vue";
</script>
