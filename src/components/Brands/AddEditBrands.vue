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
  import router from '@/router';
  
  const popupStore = usePopupStore();
  const brandStore = useBrandsStore();
  
  const visible = computed(() => popupStore.showPopup);
  const popupMessage = computed(() => popupStore.popupMessage);
  const type = computed(() => popupStore.popupType);
  const brandId = ref(router.currentRoute.value.params.id);
  const title = ref('Add Brand');
  
  onMounted(async () => {
    if (brandId.value) {
      title.value = 'Edit Brand';
      try {
        const brand = await brandStore.fetchBrand(brandId.value);
        formFields.value.forEach(field => {
            field.value = brand.brand[field.id];
            field.original = brand.brand[field.id];
          
        });
      } catch (error) {
        router.push({ name: 'brands' });
        console.error('Failed to fetch brand:', error);
      }
    }
  });
  
  const formFields = ref([
    {
      id: 'brand_id',
      type: 'hidden',
      value: '',
      original: ''
    },
    {
      id: 'brand_name',
      type: 'text',
      label: 'Brand',
      placeholder: 'Enter Category',
      required: true,
      value: '',
      original: ''
    },
    {
      id: 'description',
      type: 'text',
      label: 'Description',
      placeholder: 'Enter Description',
      required: true,
      value: '',
      original: ''
    }
  ]);
  
  const FormSubmit = (formData) => { 
    if (formData.brand_id) {
        brandStore.updateBrand(formData)
        .then(() => {
          const message = 'Brand updated successfully';
          popupStore.successPopup(message);
          router.push({ name: 'brands' });
        }).catch((error) => {
          errorValidation(error.response.data.error);
        });
    } else {
        brandStore.createBrand(formData)
        .then(() => {
          const message = 'Brand created successfully';
          popupStore.successPopup(message);
          router.push({ name: 'brands' });
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