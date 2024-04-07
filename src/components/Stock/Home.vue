<template>
    <Form formTitle="Manage Stock"
                :fields="formFields" />
</template>
<script setup>
import Form from '@/components/Manage/Form.vue';

const formFields = [
  {
    id: 'product',
    type: 'select',
    label: 'Product',
    placeholder: 'Select Product',
    value: '',
    options: [
      { value: '1', text: 'Product 1' },
      { value: '2', text: 'Product 2' },
      { value: '3', text: 'Product 3' }
    ]
  },
  {
    id: 'date',
    type: 'date',
    label: 'Date',
    value: ''
  },
  {
    id: 'in_out',
    type: 'select',
    label: 'Stock Type',
    placeholder: 'IN or OUT',
    value: '',
    options: [
      { value: 'in', text: 'IN' },
      { value: 'out', text: 'OUT' }
    ]
  }
];
</script>