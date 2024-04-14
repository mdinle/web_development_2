<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">
                <!-- Table -->
                <Table title="Stock History" innerTitle="Stock History" 
                :headers="[{name: 'Id', key: 'id'}, { name: 'Name', key: 'name' }, { name: 'Size', key: 'size' }, { name: 'Quantity change', key: 'quantity' }, { name: 'date', key: 'date' }, { name: 'Reason', key: 'reason' }, { name: 'Movement', key: 'movement' }]" 
                :data="data" />
                <!-- Table -->
            </div>
        </div>
    </div>
</template>
<script setup>
import Table from '@/components/Manage/Table.vue';
import Header from '@/components/Dashboard/Header.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import { useStockStore } from '@/store/StockStore';
import { computed, onMounted } from 'vue';
import dayjs from 'dayjs';

const stockStore = useStockStore();

const data = computed(() => {
    return stockStore.history.map((stock) => {
        return {
           id: stock.history_id,
           name: stock.product.name,
           size: stock.size.size_name,
           quantity: stock.quantity_changed,
           date: dayjs(stock.change_date.date).format('DD-MM-YYYY HH:mm'),
           reason: stock.reason,
           movement: stock.stock_movement
        }
    });
});

onMounted(async() => {
    await stockStore.fetchStockHistory().catch((error) => {
        console.error('Failed to fetch stock history:', error);
    });
});
</script>