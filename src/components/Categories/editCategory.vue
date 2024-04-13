<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()" />
    <Form @form-submit="FormSubmit" @validation-error="errorValidation" formTitle="Edit User" :fields="formFields" />
  </template>
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useCategoriesStore } from '@/store/CategoriesStore';
  import Form from '@/components/Manage/Form.vue';
  import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
  import router from '@/router';
  
  
  const visible = ref(false);
  const popupMessage = ref('');
  const type = ref('');
  const categoryId = ref(router.currentRoute.value.params.id);
  
  
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

  onMounted(async () => {
    const category = await useCategoriesStore().getCategory(categoryId.value);
    formFields.value.forEach(field => {
        field.value = category.category[field.id];
        field.original = category.category[field.id];
    });
  });
  
  const FormSubmit = (formData) => {
    useCategoriesStore().updateCategory(formData)
      .then(() => {
        successValidation();
      }).catch((error) => {
        errorValidation(error.response.data.error);
      });
  };
  
  const successValidation = () => {
    popupMessage.value = 'Category updated successfully';
    type.value = 'success';
    visible.value = true;
    setInterval(() => {
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
  
  const closeBanner = () => {
    visible.value = false;
  };
  </script>