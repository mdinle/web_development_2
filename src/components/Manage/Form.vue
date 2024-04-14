<template>
    <h1 class="text-2xl font-semibold text-gray-900">{{ pageTitle }}</h1>
    <!-- Table -->
    <div class="w-full gap-3 md:flex">
        <div class="w-full mt-5 p-5 border-gray-200 border rounded-xl shadow-lg">
            <form @submit.prevent="onSubmit">
                <p class="font-bold pb-3">{{ formTitle }}</p>
                <div class="border-b border-gray-900/10 pb-12">
                    <template v-for="field in fields" :key="field.id">
                        <div v-if="field.type === 'select'" class="col-span-full mb-3">
                            <label :for="field.id" class="block text-sm font-medium leading-6 text-gray-900">{{
                                field.label }}</label>
                            <select :name="field.id" :id="field.id" v-model="field.value"
                                :data-original="field.original"
                                @change="$emit('update-product', { id: field.id, value: field.value})"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="" disabled selected>{{ field.placeholder }}</option>
                                <option v-for="option in field.options" :key="option.value" :value="option.value" >
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div v-else class="col-span-full mb-3">
                            <label :for="field.id" class="block text-sm font-medium leading-6 text-gray-900">{{
                                field.label }}</label>
                            <input :type="field.type" :name="field.id" :id="field.id" v-model="field.value"
                                @change="$emit('update-product', { id: field.id, value: field.value})"
                                :data-original="field.original"
                                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </template>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6" :class="hide">
                    <button type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form>
        </div>

        <!-- <div class="w-full mt-5 p-5 border-gray-200 border rounded-xl shadow-lg">
            <form>
                <p class=" font-bold pb-3">Product Size</p>
                <div class="hidden">
                    <div class="col-span-full mb-3">
                        <label for="size_1" class="block text-sm font-medium leading-6 text-gray-900">XL</label>
                        <div class="mt-2">
                            <input type="number" name="size_1" id="size_1" placeholder="Quantity"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-full mb-3">
                        <label for="size_1" class="block text-sm font-medium leading-6 text-gray-900">L</label>
                        <div class="mt-2">
                            <input type="number" name="size_1" id="size_1" placeholder="Quantity"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-full mb-3">
                        <label for="size_1" class="block text-sm font-medium leading-6 text-gray-900">M</label>
                        <div class="mt-2">
                            <input type="number" name="size_1" id="size_1" placeholder="Quantity"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label for="size_1" class="block text-sm font-medium leading-6 text-gray-900">S</label>
                        <div class="mt-2">
                            <input type="number" name="size_1" id="size_1" placeholder="Quantity"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                </div>
            </form>
        </div> -->
    </div>
    <!-- Table -->
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    pageTitle: String,
    formTitle: String,
    hide: String,
    fields: Array,
});

const emit = defineEmits(['form-submit', "validation-error", 'update-product']);

const onSubmit = () => {
    const formData = {};
    let isValid = true;
    let allFieldsOriginal = true;

    props.fields.forEach(field => {
        if (field.type !== 'hidden') {
            if (field.value.toString().trim() === '') {
                emit('validation-error', `The field ${field.label} cannot be empty.`);
                isValid = false;
                return;
            }
            if (field.value !== field.original) {
                allFieldsOriginal = false;
                // formData[field.id] = field.value;
            }
        }
        formData[field.id] = field.value;
    });

    if (allFieldsOriginal) {
        if (isValid) {
            emit('validation-error', 'No changes made.');
            isValid = false;
        }
    }

    if (isValid) {
        emit('form-submit', formData);
    }
};
</script>