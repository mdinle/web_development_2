<template>
    <div class=" pt-2 pb-5 px-5 p-fluid">
        <DataTable paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" v-model:editingRows="editingRows"
            :value="products" removableSort editMode="row" dataKey="id" @row-edit-save="onRowEditSave" :pt="{
            table: { style: 'min-width: 50rem' }
        }">
            <Column field="id" header="Id" sortable style="width: 20%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column header="Image" style="width: 20%">
                <template #body="slotProps">
                    <img :src="`${slotProps.data.image}`"
                        :alt="slotProps.data.image" class="w-[6rem] shadow-md rounded" />
                </template>
            </Column>
            <Column field="name" header="Name" sortable style="width: 20%">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column field="price" header="Price" sortable style="width: 20%">
                <template #body="{ data, field }">
                    {{ formatCurrency(data[field]) }}
                </template>
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" mode="currency" currency="EUR" locale="en-US" />
                </template>
            </Column>
            <Column field="stock" header="Stock" sortable style="width: 20%">
                <template #editor="{ data, field }">
                    <InputNumber v-model="data[field]" />
                </template>
            </Column>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
            <Column style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
                <template #body="{ data }">
                    <button @click="deleteRow(data.code)" class="p-button p-button-danger p-button-outlined">
                        <XCircleIcon class="h-5 w-5 text-red-500" />
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script setup>
import { XCircleIcon } from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';
import { ref, onMounted, toRaw } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { ProductServices } from '../../service/ProductsServices';


const products = ref();

const editingRows = ref([]);

onMounted(() => {
    ProductServices.getProducts().then((response) => {
        products.value = response;
    });
});

const onRowEditSave = (event) => {
    console.log('Row edit save:', event);
    let { newData, index } = event;

    products.value[index] = newData;
};

const deleteRow = (row) => {
    console.log('Deleting row:', row);
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(value);
}
</script>