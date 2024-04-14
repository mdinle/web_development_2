<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()"/>
    <Table title="Sizes" innerTitle="Manage Sizes"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Size', key: 'name' }, { name: 'Category', key: 'category' }, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <addbutton addString="Add Size" to="create-size"/>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import { useSizesStore } from '@/store/SizesStore';
import { usePopupStore } from '@/store/PopupStore';
import router from '@/router';

const popupStore = usePopupStore();
const sizesStore = useSizesStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);


const data = computed(() => {
    return sizesStore.sizes.map((size) => {
        return {
            id: size.size_id,
            name: size.size_name,
            category: size.category.category_name,
            actions: [
                { label: 'Edit', classes: 'px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(size.size_id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(size.size_id) }
            ]
        }
    })
});

onMounted(async () => {
    try {
        await sizesStore.fetchSizes();
    } catch (error) {
        console.error('Failed to fetch sizes:', error);
    }
});

const editMethod = (id) => {
    router.push({ name: 'edit-size', params: { id } });
};

const deleteMethod = async (id) => {
    sizesStore.deleteSize(id)
        .then(() => {
            const message = 'Size deleted successfully';
            popupStore.successPopup(message);
        })
        .catch((error) => {
            console.error('Failed to delete size:', error);
            const message = 'Failed to delete size';
            popupStore.errorPopup(message);
        });
};
</script>