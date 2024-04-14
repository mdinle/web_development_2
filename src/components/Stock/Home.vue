<template>
  <success-error-popup v-if="visible" :message="popupMessage" :type="type" @click="closeBanner()"/>
  <div class="md:flex md:space-x-4">
    <Form hide="hidden" formTitle="Manage Stock" :fields="AddStock" @update-product="handleProductChange" />
    <Form v-if="showForm" @form-submit="FormSubmit" @validation-error="errorValidation" formTitle="Choose Size" :fields="ChooseSize" />
  </div>
</template>
<script setup>
import Form from '@/components/Manage/Form.vue';
import SuccessErrorPopup from '@/components/Manage/succeserrorpopup.vue';
import { computed, onMounted, ref } from 'vue';
import { useProductsStore } from '@/store/ProductsStore';
import { useSizesStore } from '@/store/SizesStore';
import { useStockStore } from '@/store/StockStore';
import { usePopupStore } from '@/store/PopupStore';



const productsStore = useProductsStore();
const sizesStore = useSizesStore();
const stockStore = useStockStore();
const popupStore = usePopupStore();

const visible = computed(() => popupStore.showPopup);
const popupMessage = computed(() => popupStore.popupMessage);
const type = computed (() => popupStore.popupType);

const showForm = ref(false);
const selectedProduct = ref('');
const selectedReason = ref('');
const selectedType = ref('');

onMounted(async () => {
  try {
    await productsStore.fetchProducts();
    AddStock.value.forEach(field => {
      if (field.id === 'product') {
        field.options = field.options.concat(productsStore.products.map((product) => {
          return { value: product.id, text: product.name, original: product.id}
        }));
      }
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});

const AddStock = ref([
  {
    id: 'product',
    type: 'select',
    label: 'Product',
    placeholder: 'Select Product',
    value: selectedProduct,
    options: [
    ],
  },
  {
    id: 'in_out',
    type: 'select',
    label: 'Stock Movement',
    placeholder: 'IN or OUT',
    value: selectedType,
    options: [
      { value: 'IN', text: 'IN' },
      { value: 'OUT', text: 'OUT' }
    ]
  },
  {
    id: 'reason',
    type: 'text',
    label: 'Reason',
    value: selectedReason
  },
]);

const ChooseSize = ref([
  {
    id: 'size',
    type: 'select',
    label: 'Size',
    placeholder: 'Select Size',
    value: '',
    options: [
    ]
  },
  {
    id: 'quantity',
    type: 'number',
    label: 'Quantity',
    value: ''
  }
]);

const FormSubmit = (formData) => {
  if(selectedProduct.value !== '' && selectedReason.value !== '' && selectedType.value !== '') {
    console.log(selectedProduct.value)
    const stockData = {
      stock: [
        {
          product_id: selectedProduct.value,
          reason: selectedReason.value,
          stock_movement: selectedType.value,
          size_id: formData.size,
          stock_quantity: formData.quantity
        }
      ]
    };

    stockStore.addEditStock(stockData).then(() => {
      popupStore.successPopup('Stock updated successfully');
    }).catch((error) => {
      console.error('Failed to add stock:', error);
      errorValidation('Failed to update stock');
    });
  } else {
    errorValidation('Please fill all fields');
  }
};

const errorValidation = (message) => {
  popupStore.errorPopup(message);
};

const closeBanner = () => {
  popupStore.closePopup();
};

const handleProductChange = (newValue) => {
  if (newValue.id == 'product') {
    console.log(newValue.value)
    selectedProduct.value = newValue.value;
    useSizesStore().fetchSizesByProductId(newValue.value)
      .then(() => {
        ChooseSize.value.forEach(field => {
          if (field.id === 'size') {
            field.options = [];
            field.options = field.options.concat(sizesStore.sizes.map((size) => {
              return { value: size.size_id, text: size.size_name }
            }));
          }
        });
      })
      .catch((error) => {
        console.error('Failed to fetch sizes:', error);
      });
      showForm.value = selectedProduct.value !== '';
  } else if (newValue.id == 'reason') {
    selectedReason.value = newValue.value;
  } else {
    selectedType.value = newValue.value;
  }
};

</script>