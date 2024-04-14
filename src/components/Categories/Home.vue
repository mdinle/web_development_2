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
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import { usePopupStore } from '@/store/PopupStore';
import { useCategoriesStore } from '@/store/CategoriesStore';
import router from '@/router';

const popupStore = usePopupStore();
const categoryStore = useCategoriesStore();

const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);
const visible = computed(() => popupStore.showPopup);

const data = computed(() => {
    return categoryStore.categories.map((category) => {
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
    try {
        await useCategoriesStore().fetchCategories();
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
});

const editMethod = (id) => {
    router.push({ name: 'edit-category', params: { id } });
};

const deleteMethod = async (id) => {
    categoryStore.deleteCategory(id)
        .then(() => {
            const message = 'Category deleted successfully';
            popupStore.successPopup(message);
        })
        .catch((error) => {
            console.error('Failed to delete category:', error);
            const message = 'Failed to delete category';
            popupStore.errorPopup(message);
        });
};

const closeBanner = () => {
    popupStore.closePopup();
};

</script>