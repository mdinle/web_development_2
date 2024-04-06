<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <Table title="Sizes" innerTitle="Manage Sizes"
                    :headers="[{ name: 'Name', key: 'name' }, { name: 'Email', key: 'email' }, { name: 'Role', key: 'role' }, { name: 'Status', key: 'status' }, { name: 'Action', key: 'action' }]"
                    :data="[
                        {
                            name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'Active',
                            actions: [
                                { label: 'Edit', classes: 'ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: editMethod },
                                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: deleteMethod }
                            ]
                        },
                        {
                            name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Inactive',
                            actions: [
                                { label: 'Edit', classes: 'ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: editMethod },
                                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: deleteMethod }
                            ]
                        }
                    ]" />

                <addbutton addString="Add Size" />

            </div>
        </div>
    </div>
</template>
<script setup>
import Table from '@/components/Manage/Table.vue';
import Header from '@/components/Dashboard/Header.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
</script>