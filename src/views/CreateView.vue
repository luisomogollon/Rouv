<template>

<div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div class="mx-auto max-w-md">
     
      <div class="divide-y divide-gray-300/50">
        <div class="space-y-6  py-8 t font-bold  text-gray-900">
          <p class="font-bold text-lg text-gray-700">This is a simple Practice App (Crud)</p>
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Tailwind CSS
                
              </p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Vue.js
            
              </p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">Sweetalert2</p>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">
                Vue-router and Axios
                <code class="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
          </ul>
          <p>These are all the technologies used to build this application that also handles an external Api.</p>
        </div>
        <div class="pt-8 text-base font-semibold leading-7">
          <p class="text-gray-900 text-md font-semibold">Luiso</p>
         
        </div>
        
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      newProductTitle: "",
      newProductCategory: "",
      newProductPrice: 0,
    };

  },
  created() {
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      const response = await axios.get("https://fakestoreapi.com/products");
      this.products = response.data.map((product) => ({
        ...product,
        editMode: false,
      }));
    },

    editProduct(product) {
      product.editMode = true;
    },
    cancelEdit(product) {
      product.editMode = false;
    },

    async saveProduct(product) {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${product.id}`,
        product
      );
      this.products = this.products.map((p) =>
        p.id === product.id ? response.data : p
      );
      product.editMode = false;
    },

    async deleteProduct(product) {
      await axios.delete(`https://fakestoreapi.com/products/${product.id}`);
      this.products = this.products.filter((p) => p.id !== product.id);
    },

    async createProduct() {
      const response = await axios.post("https://fakestoreapi.com/products", {
        title: this.newProductTitle,
        category: this.newProductCategory,
        price: this.newProductPrice,
      });
      this.products.push(response.data);
      this.newProductTitle = "";
      this.newProductCategory = "";
      this.newProductPrice = 0;
    },
  },
};
</script>

