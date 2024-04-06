<template>
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
        <Header />
        <NavigationBar />
        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
            <div class="relative p-10 overflow-x-auto sm:rounded-lg">

                <Table title="Users" innerTitle="Manage Users"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Username', key: 'username' }, { name: 'Email', key: 'email' }, { name: 'Status', key: 'status' }, { name: 'created at', key: 'created_at' }, { name: 'Action', key: 'action' }]"
                    :data="data" />

                <!-- <RouterLink> -->
                    <addbutton addString="Add User" />
                <!-- </RouterLink> -->

            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import Header from '@/components/Dashboard/Header.vue';
import NavigationBar from '@/components/Dashboard/NavigationBar.vue';
import UserServices from '@/service/UserServices';

const error = ref(null);
const { users, getUsers } = UserServices(error);

const data = computed(() =>{
    return users.value.map((user) => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            status: user.status,
            created_at: user.created_at,
            actions: [
                { label: 'Edit', classes: 'px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out', onClick: () => editMethod(user.id) },
                { label: 'Delete', classes: 'ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out', onClick: () => deleteMethod(user.id) }
            ]
        }
    })
});

onMounted(async () => {
    await getUsers();
});
</script>