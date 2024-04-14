<template>
  <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()" />
  <Form @form-submit="FormSubmit" @validation-error="errorValidation" :formTitle="title" :fields="formFields" />
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Form from '@/components/Manage/Form.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import { useCategoriesStore } from '@/store/CategoriesStore';
import { usePopupStore } from '@/store/PopupStore';
import router from '@/router';

const popupStore = usePopupStore();
const categoryStore = useCategoriesStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);
const categoryId = ref(router.currentRoute.value.params.id);
const title = ref('Add Category');

onMounted(async () => {
  if (categoryId.value) {
    title.value = 'Edit Category';
    try {
      const category = await categoryStore.getCategory(categoryId.value);
      formFields.value.forEach(field => {
        field.value = category.category[field.id];
        field.original = category.category[field.id];
      });
    } catch (error) {
      console.error('Failed to fetch category:', error);
    }
  }
});

const formFields = ref([
  {
    id: 'category_id',
    type: 'hidden',
    value: '',
    original: ''
  },
  {
    id: 'category_name',
    type: 'text',
    label: 'Category',
    placeholder: 'Enter Category',
    required: true,
    value: '',
    original: ''
  },
]);

const FormSubmit = (formData) => { 
  if (formData.category_id) {
    categoryStore.updateCategory(formData)
      .then(() => {
        const message = 'Category updated successfully';
        popupStore.successPopup(message);
        router.push({ name: 'categories' });
      }).catch((error) => {
        errorValidation(error.response.data.error);
      });
  } else {
    categoryStore.createCategory(formData)
      .then(() => {
        const message = 'Category created successfully';
        popupStore.successPopup(message);
        router.push({ name: 'categories' });
      }).catch((error) => {
        console.log(error.response.data.error);
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