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
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Brand', key: 'brand' }, { name: 'Product name', key: 'name' }, { name: 'Category', key: 'category' }, {name: 'Size', key: 'size'}, { name: 'Price', key: 'price' }, { name: 'Stock', key: 'stock' }, { name: 'Action', key: 'action' }]"
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

const useProducts = useProductsStore();

const latestProducts = ref([]);

const data = computed(() =>{
    return latestProducts.value.map((latestProduct) => {
        return {
            id: latestProduct.id,
            brand: latestProduct.brand.brand_name,
            name: latestProduct.name,
            category: latestProduct.category.category_name,
            size: latestProduct.size.size_name,
            price: latestProduct.price,
            stock: latestProduct.stock,
            actions: [
            { label: 'Show', classes: 'px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out', onClick: () => showMethod(product.id)},
                { label: 'Edit', classes: 'ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(product.id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(product.id) }
            ]
        }
    })
});

onMounted(async () => {
    await useProducts.fetchProducts();
    latestProducts.value = useProducts.getLatestProducts;
});
</script>