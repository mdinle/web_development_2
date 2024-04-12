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
import UserServices from '@/service/UserServices';

const error = ref(null);
const { users, getUsers, deleteUser } = UserServices(error);
const visible = ref(false);
const popupMessage = ref('');
const type = ref('');

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

const editMethod = (id) => {
    console.log('Edit', id);
};

const deleteMethod = (id) => {
    deleteUser(id)
        .then(() => {
            successValidation();
        })
        .catch((error) => {
            errorValidation(error.response.data.error);
        });
};

const successValidation = () => {
    popupMessage.value = 'User deleted successfully';
    type.value = 'success';
    visible.value = true;
    setInterval(() => {
        visible.value = false;
        location.reload()
    }, 2000);
};

const errorValidation = (message) => {
    popupMessage.value = message;
    type.value = 'error';
    visible.value = true;
    setInterval(() => {
        visible.value = false;
    }, 3000);
};

</script>