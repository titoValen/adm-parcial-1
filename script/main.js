const app = Vue.createApp({
  data() {
    return {
      products: [],
      carrito: [],
      mostrarCarrito: false,
      mostrarFiltro: false,
      filtro: "",
    };
  },
  computed: {
    calcularValor() {
      return this.carrito.reduce((acc, item) => acc + item.precio, 0);
    },
    productosFiltrados() {
      return this.products.filter(
        (p) =>
          p.name.toLowerCase().includes(this.filtro.toLowerCase()) ||
          p.brand.toLowerCase().includes(this.filtro.toLowerCase()) ||
          p.category.toLowerCase().includes(this.filtro.toLowerCase()),
      );
    },
  },
  mounted() {
    fetch("../data/products.json")
      .then((response) => response.json())
      .then((data) => {
        this.products = data.products;
      })
      .catch((error) => console.error("Error loading products:", error));
  },
  methods: {
    agregarAlCarrito(producto) {
      this.carrito.push(producto);
      // console.log("Producto agregado al carrito:", producto);
    },
    verCarrito() {
      if (this.carrito.length === 0) {
        return alert("El carrito esta vacio");
      }

      this.mostrarCarrito = !this.mostrarCarrito;
    },
    vaciarCarrito() {
      if (this.carrito.length === 0) {
        return alert("El carrito ya esta vacio");
      }

      this.carrito = [];
      this.mostrarCarrito = false;
    },
    quitarDelCarrito(item) {
      const index = this.carrito.indexOf(item);
      this.carrito.splice(index, 1);

      if (this.carrito.length === 0) {
        this.mostrarCarrito = false;
      }
    },
    verFiltro() {
      this.mostrarFiltro = !this.mostrarFiltro;
    }
  },
});

app.component("com-header", {
  props: ["carrito", "filtro"],
  emits: ["ver-carrito", "ver-filtro"],
  template: `
    <header>
      <h1>Tienda de zapatillas</h1>
      <div class="header-buttons">
        <button @click="$emit('ver-carrito')">
          <figure>
            <img src='../img/icon/cart.svg'>
          </figure>
          <span>Tu carrito</span>
        </button>
        <button @click="$emit('ver-filtro')">
          <figure>
            <img src='../img/icon/filter.svg'>
          </figure>
          <span>Filtrar</span>
        </button>
      </div>
    </header>
  `,
});

app.component("com-product", {
  props: ["nombre", "imagen", "precio"],
  emits: ["agregar-al-carrito"],
  template: `
    <img :src="imagen" :alt="nombre">
    <h2>{{ nombre }}</h2>
    <p>{{ precio.toFixed(2) }}</p>
    <button @click="$emit('agregar-al-carrito', { nombre, imagen, precio })">Agregar al carrito</button>
  `,
});

app.component("com-modal", {
  props: ["carrito", "calcularValor"],
  emits: ["quitar-del-carrito", "vaciar-carrito", "cerrar-modal"],
  template: `
  <div class="modal">
    <h2>Tu carrito</h2>
    <div class="container-list-product">
      <div
        v-for="item in carrito"
        :key="item.nombre"
        class="colunm-product"
      >
        <div>
          <span v-text="item.nombre"></span>
          <span v-text="item.precio"></span>
        </div>
        <button @click="$emit('quitar-del-carrito', item)">
          <figure>
            <img src="img/icon/delete.svg" alt="Icono de eliminar" />
          </figure>
        </button>
      </div>
    </div>
    <hr />
    <p>Total: {{ calcularValor }}</p>
    <div class="modal-buttons">
      <button @click="$emit('vaciar-carrito')">Vaciar carrito</button>
      <button @click="$emit('cerrar-modal')">Cerrar</button>
    </div>
  </div>
  `
})

app.component("com-footer", {
  template: `
  <footer>
    <span>Creado por Tito Valentín</span>
  </footer>
  `,
});

app.mount("#app");
