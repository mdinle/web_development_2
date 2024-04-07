<template>
    <Form  formTitle="Create User"
                :fields="formFields" />
</template>
<script setup>
import Form from '@/components/Manage/Form.vue';

const formFields = [
  {
    id: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter Name',
    value: ''
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    value: ''
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    value: ''
  }
];
</script>