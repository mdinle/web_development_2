<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()" />
    <Form @form-submit="FormSubmit" @validation-error="errorValidation" :formTitle="title" :fields="formFields" />
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Form from '@/components/Manage/Form.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import { useBrandsStore } from '@/store/BrandsStore';
import { usePopupStore } from '@/store/PopupStore';
import { useCategoriesStore } from '@/store/CategoriesStore';
import { useProductsStore } from '@/store/ProductsStore';
import router from '@/router';

const popupStore = usePopupStore();
const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const brandsStore = useBrandsStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);
const productId = ref(router.currentRoute.value.params.id);
const title = ref('Add Product');

onMounted(async () => {
    try {
        await categoriesStore.fetchCategories();
        formFields.value.forEach(field => {
            if (field.id === 'category_id') {
                field.options = field.options.concat(categoriesStore.categories.map((category) => {
                    return { value: category.category_id, text: category.category_name }
                }));
            }
        });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
    }
    try {
        await brandsStore.fetchBrands();
        formFields.value.forEach(field => {
            if (field.id === 'brand_id') {
                field.options = field.options.concat(brandsStore.brands.map((brand) => {
                    return { value: brand.brand_id, text: brand.brand_name }
                }));
            }
        });
    } catch (error) {
        console.error('Failed to fetch brands:', error);
    }

    if (productId.value) {
        title.value = 'Edit Product';
        productsStore.getProduct(productId.value)
            .then((product) => {
                formFields.value.forEach(field => {
                    if (field.id === 'category_id') {
                        field.value = product.category[field.id];
                        field.original = product.category[field.id];
                    } else if (field.id === 'brand_id') {
                        field.value = product.brand[field.id];
                        field.original = product.brand[field.id];
                    } else {
                        field.value = product[field.id];
                        field.original = product[field.id];
                    }
                });
            }).catch((error) => {
                router.push({ name: 'products' });
                console.error('Failed to fetch product:', error);
            });
    }
});

const formFields = ref([
    {
        id: 'id',
        type: 'hidden',
        value: '',
        original: ''
    },
    {
        id: 'category_id',
        type: 'select',
        label: 'Category',
        options: [
            { value: ' ', text: 'Select Category' },
        ],
        required: true,
        value: ' ',
        original: ''
    },
    {
        id: 'brand_id',
        type: 'select',
        label: 'Brand',
        options: [
            { value: ' ', text: 'Select Brand' },],
        required: true,
        value: ' ',
        original: ''
    },
    {
        id: 'name',
        type: 'text',
        label: 'Product Name',
        placeholder: 'Enter product name',
        required: true,
        value: '',
        original: ''
    },
    {
        id: 'price',
        type: 'number',
        step: '0.01',
        label: 'Price',
        placeholder: 'Enter price',
        required: true,
        value: '',
        original: ''
    },
    {
        id: 'image',
        type: 'url',
        label: 'Image',
        required: true,
        value: '',
        original: ''
    }
]);

const FormSubmit = (formData) => {
    if (formData.id) {
        productsStore.updateProduct(formData)
            .then(() => {
                const message = 'Product updated successfully';
                popupStore.successPopup(message);
                router.push({ name: 'products' });
            }).catch((error) => {
                errorValidation(error.response.data.error);
            });
    } else {
        productsStore.createProduct(formData)
            .then(() => {
                const message = 'Product created successfully';
                popupStore.successPopup(message);
                router.push({ name: 'products' });
            }).catch((error) => {
                errorValidation(error.response.data.error);
            });
    }
};

const errorValidation = (message) => {
    popupStore.errorPopup(message);
};

const closeBanner = () => {
    popupStore.closePopup();
};
</script>