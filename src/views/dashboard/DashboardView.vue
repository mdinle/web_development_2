<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <breadcrumb/>

                <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <Stats />
                <Table title="" innerTitle="Latest Products"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Brand', key: 'brand' }, { name: 'Product name', key: 'name' }, { name: 'Category', key: 'category' }, { name: 'Price', key: 'price' }, { name: 'Size', key: 'size' }]"
                    :data="data" />

            </div>
        </div>
    </div>
</template>
<script setup>
import Table from '@/components/Manage/Table.vue';
import Stats from '@/components/Manage/Stats.vue';
import Header from '@/components/Dashboard/Header.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import breadcrumb from '@/components/Manage/breadcrumb.vue';
import { onMounted, ref, computed } from 'vue';
import { useProductsStore } from '@/store/ProductsStore';
import router from '@/router';

const useProducts = useProductsStore();

const latestProducts = ref([]);

const data = computed(() =>{
    return latestProducts.value.map((latestProduct) => {
        return {
            id: latestProduct.id,
            brand: latestProduct.brand.brand_name,
            name: latestProduct.name,
            category: latestProduct.category.category_name,
            price: latestProduct.price,
            size: latestProduct.size.size_name,
        }
    })
});

onMounted(async () => {
    await useProducts.fetchDetailedProducts();
    latestProducts.value = useProducts.getLatestProducts;
});

const showMethod = (id) => {
    router.push({ name: 'product-details', params: { id } });
};
</script>