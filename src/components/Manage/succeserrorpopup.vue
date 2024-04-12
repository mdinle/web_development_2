<template>
    <div :class="bannerClass" @click="closeBanner">
        <p>{{ message }}</p>
    </div>
</template>
<script setup>
import { defineProps, ref, computed, onMounted } from 'vue';
const props = defineProps({
    message: String,
    type: String,
});

const bannerClass = computed(() => {
    return {
        'p-4 mb-4 text-sm font-medium rounded-lg shadow-md cursor-pointer flex tems-center justify-between': true,
        'bg-green-100 text-green-700': props.type === 'success',
        'bg-red-100 text-red-700': props.type === 'error',
    };
});
</script>