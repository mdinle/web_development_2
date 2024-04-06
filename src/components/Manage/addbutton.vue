<template>
     <div class="mt-3 flex justify-end">
                    <div
                        class="bg-blue-600 flex items-center text-center p-2 rounded-lg text-white hover:bg-blue-500 active:bg-blue-600">
                        <span class="inline-flex justify-center items-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </span>
                        <span class="ml-2">{{ addString }}</span>
                    </div>
                </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  addString: String,
})
</script>