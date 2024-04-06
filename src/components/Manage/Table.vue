<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
    <div class="mt-5 min-w-full p-5 border-gray-200 border rounded-xl shadow-lg">
      <!-- Table -->
      <div class=" pt-2 pb-4 px-4">
        <p class=" font-bold">{{innerTitle}}</p>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.key"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ header.name }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="row in data" :key="row.id">
              <td v-for="header in headers" :key="header.key" class="px-6 py-4 whitespace-nowrap">
                <template v-if="header.key === 'action'">
                  <template v-for="action in row.actions">
                    <button :class="action.classes" @click="action.onClick">
                      {{ action.label }}
                    </button>
                  </template>
                </template>
                <template v-else>
                  {{ row[header.key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  innerTitle: String,
  headers: Array,
  data: Array
})
</script>