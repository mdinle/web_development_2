<template>
  <div
    class="fixed w-full flex items-center justify-between h-14 text-white z-10 bg-blue-800 shadow-md"
  >
    <div
      class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 border-none"
    >
      <img
        class="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
        src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
      />
      <span class="hidden md:block">{{userName}}</span>
    </div>
    <div
      class="flex justify-between items-center h-14 bg-blue-800 header-right"
    >
      <ul class="flex items-center">
        <li>
          <div class="block w-px h-6 mx-3 bg-gray-400"></div>
        </li>
        <li>
          <button
            @click="logoutUser"
            class="flex items-center mr-4 hover:text-blue-100"
          >
            <span class="inline-flex mr-1">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/AuthStore';
import { onMounted, ref } from 'vue';

const userName = ref(null);

onMounted(() => {
  userName.value = useAuthStore().user.username;
});

function logoutUser() {
  useAuthStore().logout();
}
</script>
