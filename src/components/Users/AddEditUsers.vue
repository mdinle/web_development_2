<template>
  <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()" />
  <Form @form-submit="FormSubmit" @validation-error="errorValidation" :formTitle="title" :fields="formFields" />
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import Form from '@/components/Manage/Form.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import router from '@/router';
import { useUsersStore } from '@/store/UsersStore';
import { usePopupStore } from '@/store/PopupStore';

const popupStore = usePopupStore();
const usersStore = useUsersStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed(() => popupStore.popupType);
const userId = ref(router.currentRoute.value.params.id);
const title = ref('Add User');


const formFields = ref([
  {
    id: 'id',
    type: 'hidden',
    value: '',
    original: ''
  },
  {
    id: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter Username',
    required: true,
    value: '',
    original: ''
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    required: true,
    value: '',
    original: ''
  },
  {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    required: true,
    value: ''
  },
  {
    id: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: 'active', text: 'Active' },
      { value: 'inactive', text: 'Inactive' }
    ],
    required: true,
    value: '',
    original: ''
  }
]);

onMounted(async () => {
  if (userId.value) {
    title.value = 'Edit User';
    try {
      const user = await usersStore.getUser(userId.value);
      formFields.value.forEach(field => {
        field.value = user.user[field.id];
        field.original = user.user[field.id];

        if (field.id === 'password') {
          field.required = false;
          field.value = '';
          field.original = '';
          field.type = 'hidden';
          field.label = '';
        }
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
      router.push({ name: 'users' });
    }
  }
});

const FormSubmit = (formData) => {
  if (userId.value) {
    usersStore.updateUser(formData)
      .then(() => {
        const message = 'User updated successfully';
        popupStore.successPopup(message);
        router.push({ name: 'users' });
      }).catch((error) => {
        errorValidation(error.response.data.error);
      });
  } else {
    usersStore.createUser(formData)
      .then(() => {
        const message = 'User created successfully';
        popupStore.successPopup(message);
        router.push({ name: 'users' });
      }).catch((error) => {
        console.log(error.response.data.error);
        errorValidation(error.response.data.error);
      });
  }
};


const errorValidation = (message) => {
  popupStore.errorPopup(message);
};

const closeBanner = () => {
  popupStore.closePopup();
};
</script>