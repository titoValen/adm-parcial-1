const app = Vue.createApp({
  data() {
    return {
      probando: "Esto es de prueba"
    }
  }
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

app.component("com-footer", {
  template:
  `
  <footer>
    <span>Creado por Tito Valentín</span>
  </footer>
  `
})

app.mount("#app");