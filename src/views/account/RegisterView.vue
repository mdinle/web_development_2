<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for free</h2>
    </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit="register">
          <div v-if="error" class=" bg-red-500 rounded-lg text-sm text-white py-2 px-4 flex items-center justify-center">
              {{ error }}
            <span @click="error = ''" class=" w-8 h-8 ml-4 hover:bg-[rgba(0,0,0,0.2)] flex items-center justify-center rounded-full transition-colors">
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
            <div>
            <label for="Username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div class="mt-2">
              <input id="username" name="username" type="text" autocomplete="username" required="" v-model="user.username" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/AuthStore';
import { ref } from 'vue';

const router = useRouter();

let error = ref(null);

  const user = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  function register(ev){
    ev.preventDefault();
    useAuthStore().register(user)
      .then(() => {
        // router.push({ name: 'dashboard' });
      })
      .catch((err) => {
        error.value = err.response.data.error;
      });
  }
  </script>