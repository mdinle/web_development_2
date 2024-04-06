<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">
                <!-- Table -->
                <Table title="Stock History" innerTitle="Stock History" 
                :headers="[{ name: 'Name', key: 'name' }, { name: 'Email', key: 'email' }, { name: 'Role', key: 'role' }, { name: 'Status', key: 'status' }]" 
                :data="[
                        {
                            name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'Active'
                        },
                        {
                            name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Inactive'
                        }
                    ]" />
                <!-- Table -->
            </div>
        </div>
    </div>
</template>
<script setup>
import Table from '@/components/Manage/Table.vue';
import Header from '@/components/Dashboard/Header.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
</script>