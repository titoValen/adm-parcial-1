const app = Vue.createApp({
  data() {
    return {
      products: [],
      carrito: []
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
  methods: {
    agregarAlCarrito(producto) {
      this.carrito.push(producto);
      // console.log("Producto agregado al carrito:", producto);
    }
  },
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
    <button @click="$emit('agregar-al-carrito', { nombre, imagen, precio })">Agregar al carrito</button>
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
