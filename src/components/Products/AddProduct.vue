<template>
    <div class=" px-5 pt-2 flex justify-end">
        <Button label="Add new product" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="New product" :style="{ width: '25rem' }">
          <span class="p-text-secondary block mb-5">Add new product.</span>
          <div class="flex items-center justify-between mb-3">
            <label for="productname" class="font-semibold w-6rem">Product</label>
            <InputText id="productname" class="" autocomplete="off" />
          </div>
          <div class="flex items-center justify-between mb-3">
            <label for="price" class="font-semibold w-6rem">Price</label>
            <InputNumber id="number" mode="currency" currency="EUR" autocomplete="off" />
          </div>
          <div class="flex items-center justify-between mb-3">
            <label for="stock" class="font-semibold w-6rem">Stock</label>
            <InputNumber id="number" class="" autocomplete="off" />
          </div>
          <div class="flex items-center justify-between mb-5">
            <label for="image" class="font-semibold w-6rem">Image</label>
            <InputText id="imageurl" class="" autocomplete="off" placeholder="Link" />
          </div>
          <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
          </div>
        </Dialog>
      </div>
</template>
<script setup>
import { ref, onMounted, toRaw } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const visible = ref(false);

</script>