<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <Table title="Brands" innerTitle="Manage Brands"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Brand', key: 'name' }, {name: 'Description', key: 'description'}, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <addbutton addString="Add Brand" />

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
import BrandsServices from '@/service/BrandsService';

const error = ref(null);
const { brands, getBrands } = BrandsServices(error);

const data = computed(() =>{
    return brands.value.map((brand) => {
        return {
            id: brand.brand_id,
            name: brand.brand_name,
            description: brand.description,
            actions: [
                { label: 'Edit', classes: 'px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(brand.brand_id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(brand.brand_id) }
            ]
        }
    })
});

onMounted(async () => {
    await getBrands();
});
</script>