<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <breadcrumb />
                <RouterView />

            </div>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/Dashboard/Header.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import breadcrumb from '@/components/Manage/breadcrumb.vue';
</script>