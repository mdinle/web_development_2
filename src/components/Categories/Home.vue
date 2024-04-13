<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()"/>
    <Table title="Categories" innerTitle="Manage Categories"
        :headers="[{ name: 'Id', key: 'id' }, { name: 'Category', key: 'name' }, { name: 'Action', key: 'action' }]"
        :data="data" />

    <addbutton addString="Add Category" to="create-category" />
</template>
<script setup>
import { onMounted, computed, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import CategoriesService from '@/service/CategoriesServices';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import router from '@/router';

const error = ref(null);
const popupMessage = ref('');
const type = ref('');
const visible = ref(false);
const { categories, getCategories } = CategoriesService(error);

const data = computed(() => {
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
});

const editMethod = (id) => {
    router.push({ name: 'edit-category', params: { id } });
};

const deleteMethod = async (id) => {
    await CategoriesService().deleteCategory(id)
        .then(() => {
            successValidation();
        })
        .catch((error) => {
            errorValidation(error.response.data.error);
        });
};

const successValidation = () => {
    popupMessage.value = 'User deleted successfully';
    type.value = 'success';
    visible.value = true;
    setTimeout(() => {
        visible.value = false;
        location.reload();
    }, 3000);
};

const errorValidation = (message) => {
    popupMessage.value = message;
    type.value = 'error';
    visible.value = true;
    setInterval(() => {
        visible.value = false;
    }, 3000);
};

</script>