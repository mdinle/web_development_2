<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()"/>
    <Table title="Brands" innerTitle="Manage Brands"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Brand', key: 'name' }, {name: 'Description', key: 'description'}, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <addbutton addString="Add Brand" to="create-brand"/>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import {useBrandsStore} from '@/store/BrandsStore';
import {usePopupStore} from '@/store/PopupStore';
import router from '@/router';

const brandStore = useBrandsStore();
const popupStore = usePopupStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);

const data = computed(() =>{
    return brandStore.brands.map((brand) => {
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
    try {
        await brandStore.fetchBrands();
    } catch (error) {
        console.error('Failed to fetch brands:', error);
    }
});

const editMethod = (id) => {
    router.push({ name: 'edit-brand', params: { id: id } });
};

const deleteMethod = (id) => {
    brandStore.deleteBrand(id)
        .then(() => {
            const message = 'Brand deleted successfully';
            popupStore.successPopup(message);
        })
        .catch((error) => {
            console.error('Failed to delete brand:', error);
            const message = 'Failed to delete brand';
            popupStore.errorPopup(message);
        });
};
</script>