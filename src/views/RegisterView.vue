<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for free</h2>
    </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit="register">
          <div v-if="error">{{ displayErrors(error) }}</div>
            <div>
            <label for="Name" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
            <div class="mt-2">
              <input id="name" name="name" type="text" autocomplete="name" required="" v-model="user.name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required="" v-model="user.email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm password</label>
            </div>
            <div class="mt-2">
              <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required="" v-model="user.password_confirmation" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          All ready a memeber?
          {{ ' ' }}
          <RouterLink :to="{name: 'login'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</RouterLink>
        </p>
      </div>
</template>
  
  <script setup>
import { useRoute } from 'vue-router';
import store from '@/store';
import { ref } from 'vue';

const router = useRoute();

let error = ref(null);

  const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  function register(ev){
    ev.preventDefault();
    store
    .dispatch('register', user)
    .then(() => {
      router.push({name: 'dashboard'});
    })
    .catch((err) => {
      error.value = err.response.data.errors;
    });
  }

  function displayErrors(errorObject){
      if (errorObject && errorObject.email) {
        // Assuming the errorObject has a property named 'email'
        return errorObject.email.map(error => `${error}`).join('\n');
      } else{
        return 'Password must be 8 characters long and contain at least one number, one letter and a symbol. \n' +
        'Password confirmation must match the password.';
      }
    };
  </script>
  
  <style scoped>
  </style>
  