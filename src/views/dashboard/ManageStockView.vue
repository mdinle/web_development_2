<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <Form formTitle="Manage Stock"
                :fields="formFields" />

            </div>
        </div>
    </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Dashboard/Header.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
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