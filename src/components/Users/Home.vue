<template>
    <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()"/>
    <Table title="Users" innerTitle="Manage Users"
                    :headers="[{ name: 'Id', key: 'id' }, { name: 'Username', key: 'username' }, { name: 'Email', key: 'email' }, { name: 'Status', key: 'status' }, { name: 'created at', key: 'created_at' }, { name: 'Action', key: 'action' }]"
                    :data="data" />

                    <addbutton addString="Add User" to="create-user" />
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Table from '@/components/Manage/Table.vue';
import addbutton from '@/components/Manage/addbutton.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import router from '@/router';
import { useUsersStore } from '@/store/UsersStore';
import { usePopupStore } from '@/store/PopupStore';

const popupStore = usePopupStore();
const usersStore = useUsersStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);

const data = computed(() =>{
    return usersStore.users.map((user) => {
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
    try {
        await usersStore.fetchUsers();
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
});

const editMethod = (id) => {
    router.push({ name: 'edit-user', params: { id: id } });
};

const deleteMethod = (id) => {
};

</script>