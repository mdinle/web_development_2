<template>
  <div class="min-h-full">
    <NavigationBar :navigation="navigation" :userNavigation="userNavigation" :user="user" />
    <Header> </Header>
    <main>
      <div class="card p-fluid">
        <DataTable v-model:editingRows="editingRows" :value="products" editMode="row" dataKey="id"
          @row-edit-save="onRowEditSave" :pt="{
      table: { style: 'min-width: 50rem' }
    }">
          <Column field="code" header="Code" style="width: 20%">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="name" header="Name" style="width: 20%">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="inventoryStatus" header="Status" style="width: 20%">
            <template #editor="{ data, field }">
              <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value"
                placeholder="Select a Status">
                <template #option="slotProps">
                  <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                </template>
              </Dropdown>
            </template>
            <template #body="slotProps">
              <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
            </template>
          </Column>
          <Column field="price" header="Price" style="width: 20%">
            <template #body="{ data, field }">
              {{ formatCurrency(data[field]) }}
            </template>
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" />
            </template>
          </Column>
          <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
      </div>

      <div class="card flex justify-center">
        <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-[14rem]" />
    </div>
    </main>

  </div>
</template>

<script setup>
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import Header from '@/components/Dashboard/Header.vue';
import { useStore } from 'vuex';
import { ref, onMounted, toRaw } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Dropdown from 'primevue/dropdown';

import { ProductService } from '@/service/ProductService';

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const products = ref();
const editingRows = ref([]);
const statuses = ref([
  { label: 'In Stock', value: 'INSTOCK' },
  { label: 'Low Stock', value: 'LOWSTOCK' },
  { label: 'Out of Stock', value: 'OUTOFSTOCK' }
]);

onMounted(() => {
  ProductService.getProductsMini().then((data) => (products.value = data));
});

const onRowEditSave = (event) => {
  let { newData, index } = event;

  products.value[index] = newData;
};
const getStatusLabel = (status) => {
  switch (status) {
    case 'INSTOCK':
      return 'success';

    case 'LOWSTOCK':
      return 'warning';

    case 'OUTOFSTOCK':
      return 'danger';

    default:
      return null;
  }
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}



const navigation = ref([
  { name: 'Dashboard', href: '/', current: false },
  { name: 'Manage Orders', href: '#', current: false },
  { name: 'Manage Products', href: '/products', current: true },
  { name: 'Manage Inventory', href: '#', current: false },
]);
const userNavigation = ref([
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]);
const store = useStore();
const user = ref({});

onMounted(() => {
  user.value = store.state.user.data;
  console.log('User data:', toRaw(user.value));
});
</script>