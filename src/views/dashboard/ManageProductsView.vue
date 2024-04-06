<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <Table title="Products" innerTitle="Manage Products"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Brand', key: 'brand' }, { name: 'Product name', key: 'name' }, { name: 'Category', key: 'category' }, { name: 'Price', key: 'price' }, { name: 'Stock', key: 'stock' }, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <addbutton addString="Add Products" />

            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import Header from '@/components/Dashboard/Header.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import ProductServices from '@/service/ProductsServices';

const error = ref(null);
const { products, getProducts } = ProductServices(error);

const data = computed(() =>{
    return products.value.map((product) => {
        return {
            id: product.id,
            brand: product.brand.brand_name,
            name: product.name,
            category: product.category.category_name,
            price: product.price,
            stock: product.stock,
            actions: [
            { label: 'Show', classes: 'px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out', onClick: () => showMethod(product.id)},
                { label: 'Edit', classes: 'ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(product.id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(product.id) }
            ]
        }
    })
});

onMounted(async () => {
    await getProducts();
});
</script>