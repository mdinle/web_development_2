<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()" />
    <Form @form-submit="FormSubmit" @validation-error="errorValidation" :formTitle="title" :fields="formFields" />
  </template>
  <script setup>
  import { computed, onMounted, ref } from 'vue';
  import Form from '@/components/Manage/Form.vue';
  import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
  import { useSizesStore } from '@/store/SizesStore';
  import { usePopupStore } from '@/store/PopupStore';
  import { useCategoriesStore } from '@/store/CategoriesStore';
  import router from '@/router';
  
  const popupStore = usePopupStore();
  const sizesStore = useSizesStore();
  const categoriesStore = useCategoriesStore();
  
  const visible = computed(() => popupStore.showPopup);
  const popupMessage = computed(() => popupStore.popupMessage);
  const type = computed(() => popupStore.popupType);
  const sizeId = ref(router.currentRoute.value.params.id);
  const title = ref('Add Size');
  
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
    if (sizeId.value) {
      title.value = 'Edit Size';
      try {
        const size = await sizesStore.fetchSize(sizeId.value);
        formFields.value.forEach(field => {
            if(field.id === 'category_id') {
                field.value = size.size.category[field.id];
                field.original = size.size.category[field.id];
            }else{
              field.value = size.size[field.id];
              field.original = size.size[field.id];
            }
        });
      } catch (error) {
        router.push({ name: 'sizes' });
        console.error('Failed to fetch size:', error);
      }
    }
  });
  
  const formFields = ref([
    {
      id: 'size_id',
      type: 'hidden',
      value: '',
      original: ''
    },
    {
      id: 'size_name',
      type: 'text',
      label: 'Size',
      placeholder: 'Enter Size',
      required: true,
      value: '',
      original: ''
    },
    {
        id: 'category_id',
        type: 'select',
        label: 'Category',
        options: [
            {value: ' ', text: 'Select Category'},
    ],
        required: true,
        value: ' ',
        original: ''
    },
  ]);
  
  const FormSubmit = (formData) => { 
    if (formData.size_id) {
        sizesStore.updateSize(formData)
        .then(() => {
          const message = 'Size updated successfully';
          popupStore.successPopup(message);
          router.push({ name: 'sizes' });
        }).catch((error) => {
          errorValidation(error.response.data.error);
        });
    } else {
        sizesStore.createSize(formData)
        .then(() => {
          const message = 'Size created successfully';
          popupStore.successPopup(message);
          router.push({ name: 'sizes' });
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