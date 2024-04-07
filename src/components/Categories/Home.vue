<template>
    <Table title="Categories" innerTitle="Manage Categories"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Category', key: 'name' }, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <addbutton addString="Add Category" />
</template>
<script setup>
import { onMounted, computed, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import CategoriesService from '@/service/CategoriesServices';

const error = ref(null);
const { categories, getCategories } = CategoriesService(error);

const data = computed(() =>{
    return categories.value.map((category) => {
        return {
            id: category.category_id,
            name: category.category_name,
            actions: [
                { label: 'Edit', classes: 'px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(category.category_id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(category.category_id) }
            ]
        }
    })
});

onMounted(async () => {
    await getCategories();
    console.log(categories.value);
});

</script>