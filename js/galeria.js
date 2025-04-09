document.addEventListener("DOMContentLoaded", () => {
    const contenedorGaleria = document.getElementById("galeria");
  
    fetch("../json/galeria.json")
      .then(res => res.json())
      .then(imagenes => {
        imagenes.forEach(imagen => {
          // Creamos el contenedor de la oferta
          const ofertaDiv = document.createElement("div");
          ofertaDiv.classList.add("oferta");
  
          // Añadimos la imagen
          const img = document.createElement("img");
          img.src = imagen.src;
          img.alt = imagen.alt;
          img.width = imagen.width;
          img.height = imagen.height;
          img.classList.add("galeria");
          img.setAttribute("data-lightbox", "galeria");
          ofertaDiv.appendChild(img);
  
          // Añadimos el título y el precio
          const infoDiv = document.createElement("div");
  
          const titulo = document.createElement("h2");
          titulo.classList.add("oferta");
          titulo.textContent = imagen.alt; // Usamos el título del JSON
          infoDiv.appendChild(titulo);
  
          const precio = document.createElement("p");
          precio.classList.add("oferta");
          precio.innerHTML = `desde <span>${imagen.precio}</span>€`; // Usamos el precio del JSON
          infoDiv.appendChild(precio);
  
          ofertaDiv.appendChild(infoDiv);
  
          // Añadimos la oferta al contenedor
          contenedorGaleria.appendChild(ofertaDiv);
        });
  
        iniciarLightbox(); // activamos lightbox después de que las imágenes estén en el DOM
      })
      .catch(err => console.error("Error al cargar imágenes:", err));
  });
  
  function iniciarLightbox() {
    // Añadimos funcionalidad de lightbox
    const images = document.querySelectorAll("img[data-lightbox]");
  
    if (images.length > 0) {
      const lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");
      document.body.appendChild(lightbox);
  
      const lightboxCloseButton = document.createElement("button");
      lightboxCloseButton.classList.add("lightbox__close");
      lightboxCloseButton.innerHTML = "X";
  
      images.forEach((image) => {
        image.addEventListener("click", (e) => {
          lightbox.classList.add("active");
          const img = document.createElement("img");
          img.src = image.src; // Establecemos la imagen que se hará grande en el lightbox
  
          while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
          }
  
          lightbox.appendChild(img);
          lightbox.appendChild(lightboxCloseButton);
          document.body.classList.add("overflow-hidden"); // Evita el scroll cuando el lightbox está abierto
        });
      });
  
      // Cerrar lightbox cuando se hace clic en el fondo
      lightbox.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
  
      // Cerrar lightbox cuando se hace clic en el botón de cierre
      lightboxCloseButton.addEventListener("click", () => {
        lightbox.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
    }
  }