<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()" />
    <Form @form-submit="FormSubmit" @validation-error="errorValidation" formTitle="Edit User" :fields="formFields" />
  </template>
  <script setup>
  import { ref } from 'vue';
  import Form from '@/components/Manage/Form.vue';
  import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
  import UserServices from '@/service/UserServices';
  import router from '@/router';
  
  const { createUser } = UserServices();
  const visible = ref(false);
  const popupMessage = ref('');
  const type = ref('');
  
  const formFields = [
    {
      id: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Enter Username',
      required: true,
      value: ''
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      required: true,
      value: ''
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      required: true,
      value: ''
    }
  ];
  
  const FormSubmit = (formData) => {
    createUser(formData)
      .then(() => {
        successValidation();
      }).catch((error) => {
        errorValidation(error.response.data.error);
      });
  };
  
  const successValidation = () => {
    popupMessage.value = 'User created successfully';
    type.value = 'success';
    visible.value = true;
    setInterval(() => {
      visible.value = false;
      location.reload();
    }, 2000);
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