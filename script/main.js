const app = Vue.createApp({
  data() {
    return {
      probando: "Esto es de prueba",
      products: [],
    };
  },
  mounted() {
    fetch("../data/products.json")
      .then((response) => response.json())
      .then((data) => {
        this.products = data.products;
      })
      .catch((error) => console.error("Error loading products:", error));
  },
  methods: {},
});

app.component("com-header", {
  template: 
  `
  <header>
    <h1>Tienda de zapatillas</h1>
    <button>
      <figure>
        <img src='../img/icon/cart.svg'>
      </figure>
      <span>Tu carrito</span>
    </button>
  </header>
  `
});

app.component("com-product", {
  props: ["nombre", "imagen", "precio"],
  template: 
  `
    <img :src="imagen" :alt="nombre">
    <h2>{{ nombre }}</h2>
    <p>{{ precio.toFixed(2) }}</p>
    <button>Agregar al carrito</button>
  `
});

app.component("com-footer", {
  template: 
  `
  <footer>
    <span>Creado por Tito Valentín</span>
  </footer>
  `
});

app.mount("#app");
