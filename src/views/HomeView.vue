<template>
  <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12 sm:mb-0">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
          >
            Create a New Product (CRUD)
          </h1>
        </div>
        <div
          class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"
        >
          <div class="relative flex-grow w-full">
            <label for="full-name" class="leading-7 text-sm text-gray-600"
              >Title</label
            >
            <input
            type="text"
              v-model="newProductTitle"
              name="text"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative flex-grow w-full">
            <label for="text" class="leading-7 text-sm text-gray-600"
              >Category</label
            >
            <input
              type="text"
              v-model="newProductCategory"
              name="text"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative flex-grow w-full">
            <label for="text" class="leading-7 text-sm text-gray-600"
              >Price</label
            >
            <input
              type="number"
              v-model="newProductPrice"
              name="text"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            @click="createProduct()"
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Save
          </button>
        </div>
       
      </div>
    </section>
  </div>

  <ul class="" v-if="products.length">
    <li v-for="product in products" :key="product.id"></li>
    <div
      class="lg:w-4/6 w-4/7 mx-auto overflow-auto whitespace-no-wrap sm:flex-row bg-gray-50"
    >
      <table class="table-auto text-left h-screen whitespace-no-wrap">
        <thead>
          <tr>
            <th
              class="px-2 py-3 sm:text-1xl title-font tracking-wider font-bold text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl"
            >
              List Of Products
            </th>
            <th
              class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
            ></th>
            <th
              class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100"
            ></th>
          </tr>
        </thead>

        <tbody v-if="products.length" class="space-y-2 flex-row">
          <li v-for="product in products" :key="product.id">
            <div class="space-x-3" v-if="product.editMode">
              <input
                class="bg-slate-200"
                v-model="product.title"
                type="text "
              />
              <input
                class="bg-slate-200"
                v-model="product.category"
                type="text"
              />
              <input
                class="bg-slate-200"
                v-model="product.price"
                type="number"
              />
              <button
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 border-gray-400 rounded shadow"
                @click="saveProduct(product)"
              >
                Save
              </button>
              <button
                class="bg-slate-50 hover:bg-white text-gray-800 font-semibold py-1 px-2 border-gray-400 rounded shadow"
                @click="cancelEdit(product)"
              >
                Cancel
              </button>
            </div>

            <tr v-else class="space-x-2 title-font font-semibold text-gray-900">
              {{
                product.title
              }}
              -
              {{
                product.category
              }}
              -$
              {{
                product.price
              }}
              <div class="space-x-2 space-y-3">
                <button
                  class="bg-blue-400 hover:bg-blue-500 text-gray-50 font-semibold py-1 px-3 rounded"
                  @click="editProduct(product)"
                >
                  Edit
                </button>
                <button
                  class="bg-slate-400 hover:bg-red-300 text-gray-50 font-semibold py-1 px-2 rounded"
                  @click="deleteProduct(product)"
                >
                  Delete
                </button>
              </div>
            </tr>
          </li>
        </tbody>
      </table>
    </div>
  </ul>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
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
      Swal.fire("Saved Modification!");
    },

    async deleteProduct(product) {
      const result = await Swal.fire({
        title: "¿Estás seguro de que quieres eliminar este producto?",
        text: "Una vez eliminado, no podrás recuperarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
      });

      if (result.value) {
        await axios.delete(`https://fakestoreapi.com/products/${product.id}`);
        this.products = this.products.filter((p) => p.id !== product.id);
        Swal.fire({
          title: "Producto eliminado",
          text: "El producto ha sido eliminado con éxito.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Acción cancelada",
          text: "El producto no ha sido eliminado.",
          icon: "error",
        });
      }
    },

    async createProduct() {
      if (
        !this.newProductTitle ||
        !this.newProductCategory ||
        !this.newProductPrice
      ) {
        Swal.fire({
          title: "Error al crear el producto",
          text: "Por favor complete todos los campos.",
          icon: "error",
        });
        return;
      }

      try {
        const response = await axios.post("https://fakestoreapi.com/products", {
          title: this.newProductTitle,
          category: this.newProductCategory,
          price: this.newProductPrice,
        });
        this.products.push(response.data);
        this.newProductTitle = "";
        this.newProductCategory = "";
        this.newProductPrice = 0;
        Swal.fire({
          title: "Producto creado",
          text: "El producto se ha creado exitosamente.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error al crear el producto",
          text: "Por favor complete todos los campos.",
          icon: "error",
        });
      }
    },
  },
};
</script>
