<template>
    <div v-for="product in products">
        <h1>Product Details</h1>
        <p>Product ID: {{ product.id }}</p>
        <p>Product Name: {{ product.name }}</p>
        <p>Product Price: {{ product.price }}</p>
        <!-- <p>Product Description: {{ product.description }}</p> -->
        <p>Product Category: {{ product.category }}</p>
        <p>Product Brand: {{ product.brand }}</p>
        <p>Product Size: {{ product.size }}</p>
        <p>Product Stock: {{ product.stock }}</p>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useProductsStore } from '@/store/ProductsStore';
import { useRoute } from 'vue-router';

const productsStore = useProductsStore();
const route = useRoute();

const products = ref([]);
const productId = ref(route.params.id);

onMounted(() => {
    productsStore.fetchDetailedProduct(productId.value)
        .then((data) => {
            products.value = data;
        })
        .catch((error) => {
            console.error('Failed to fetch product:', error);
        });
});



</script>