<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()"/>
    <Table title="Products" innerTitle="Manage Products"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Brand', key: 'brand' }, { name: 'Product name', key: 'name' }, { name: 'Category', key: 'category' }, {name: 'Price', key: 'price'}, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <addbutton addString="Add Products" to="create-product"/>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import { useProductsStore } from '@/store/ProductsStore';
import { usePopupStore } from '@/store/PopupStore';
import router from '@/router';

const productsStore = useProductsStore();
const popupStore = usePopupStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);


const data = computed(() =>{
    return productsStore.products.map((product) => {
        return {
            id: product.id,
            brand: product.brand.brand_name,
            name: product.name,
            category: product.category.category_name,
            price: product.price,
            actions: [
            { label: 'Show', classes: 'px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out', onClick: () => showMethod(product.id)},
                { label: 'Edit', classes: 'ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(product.id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(product.id) }
            ]
        }
    })
});

onMounted(async () => {
    try {
        await productsStore.fetchProducts();
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
});

const showMethod = (id) => {
    router.push({ name: 'product-details', params: { id } });
};

const editMethod = (id) => {
    router.push({ name: 'edit-product', params: { id } });
};

const deleteMethod = async (id) => {
    productsStore.deleteProduct(id)
        .then(() => {
            const message = 'Product deleted successfully';
            popupStore.successPopup(message);
        })
        .catch((error) => {
            console.error('Failed to delete product:', error);
            const message = 'Failed to delete product';
            popupStore.errorPopup(message);
        });
};
</script>