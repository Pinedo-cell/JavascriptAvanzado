document.addEventListener("DOMContentLoaded", () => {
  // Referencias a los elementos del formulario
  const form = document.getElementById("presupuesto-form");
  const productoSelect = document.getElementById("producto");
  const plazoInput = document.getElementById("plazo");
  const presupuestoElement = document.getElementById("presupuesto");


  // Función para cargar las opciones de productos desde el JSON
  fetch('../json/galeria.json')
    .then(res => res.json())
    .then(productos => {
      productos.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.precio;
        option.textContent = `${producto.alt} - ${producto.precio}€`;
        productoSelect.appendChild(option);
      });
    })
    .catch(err => console.error("Error al cargar los productos:", err));
  //Funcion  para validar los datos
  function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const apellidos = document.getElementById("apellidos").value;
  
    const nombreValido = /^[a-zA-Z0-9\_\-]{4,16}$/.test(nombre);
    const apellidosValidos = /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(apellidos);
    const emailValido = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    const telefonoValido = /^[0-9]{9}$/.test(telefono);

    if(nombreValido==false){
      return "Nombre no valido, revisa que no contenga numeros"
    }
    if(apellidosValidos==false){
      return "Apellidos no validos, revisa que no contenga numeros"
    }
    if(emailValido==false){
      return "Email no valido, revisa tenga un @ y un dominio correcto"
    }
    if(telefonoValido==false){
      return  "Telefono no valido, revisa que sean 9 numeros sin letras ni espacios"
    }

    return "Formulario enviado con exito"
  }
  // Cálculo del presupuesto
  function calcularPresupuesto() {
    const productoPrecio = parseInt(productoSelect.value);
    const plazo = parseInt(plazoInput.value);
    const extras = document.querySelectorAll("input[name='extras']:checked");
    let extrasTotal = 0;

    extras.forEach(extra => {
      extrasTotal += parseInt(extra.value);
    });

    // Aplicar descuento dependiendo del plazo
    let descuento = 0;
    if (plazo >= 12) {
      descuento = 0.2;
    }
    if (plazo >= 24) {
        descuento = 0.4; 
    }

    const precioFinal = productoPrecio + extrasTotal - (productoPrecio + extrasTotal) * descuento;
    presupuestoElement.textContent = `${precioFinal}€`;
  }

  // Eventos
  form.addEventListener("input", () => {
    calcularPresupuesto();
  });

  // Enviar el formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(validarFormulario());
  });
});