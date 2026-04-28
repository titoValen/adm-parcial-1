const app = Vue.createApp({
  data() {
    return {
      products: [],
      carrito: [],
      mostrarCarrito: false,
    };
  },
  computed: {
    calcularValor() {
      return this.carrito.reduce((acc, item) => acc + item.precio, 0);
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
  },
});

app.component("com-header", {
  props: ["carrito"],
  emits: ["ver-carrito"],
  template: `
    <header>
      <h1>Tienda de zapatillas</h1>
      <button @click="$emit('ver-carrito')">
        <figure>
          <img src='../img/icon/cart.svg'>
        </figure>
        <span>Tu carrito</span>
      </button>
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

app.component("com-footer", {
  template: `
  <footer>
    <span>Creado por Tito Valentín</span>
  </footer>
  `,
});

app.mount("#app");
