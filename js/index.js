document.addEventListener('DOMContentLoaded', () => {
  // Cargar noticias
  fetch('../json/noticias.json')
    .then(res => res.json())
    .then(noticias => {
      const contenedorNoticias = document.getElementById('noticias');
      noticias.forEach(noticia => {
        const section = document.createElement('section');
        section.classList.add("noticia");
        section.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <div class="texto-foto">
              <p>${noticia.contenido}</p>
              <img src="${noticia.imagen}" class="${noticia.nombre}" width="${noticia.width}" height="${noticia.height}" alt="${noticia.nombre}" />
          </div>
        `;
        contenedorNoticias.appendChild(section);
      });
    })
    .catch(err => console.error("Error al cargar noticias:", err));

  // Cargar consejos
  fetch('../json/consejos.json')
    .then(res => res.json())
    .then(consejos => {
      const contenedorConsejos = document.getElementById('consejos');
      consejos.forEach(consejo => {
        const section = document.createElement('section');
        section.classList.add("consejo");
        section.innerHTML = `
          <h3>${consejo.titulo}</h3>
          <div class="texto-foto">
              <img src="${consejo.imagen}" class="${consejo.nombre}" width="${consejo.width}" height="${consejo.height}" alt="${consejo.nombre}" />
              <p>${consejo.contenido}</p>
          </div>
        `;
        contenedorConsejos.appendChild(section);
      });
    })
    .catch(err => console.error("Error al cargar consejos:", err));

  // Cargar novedades deportivas
  fetch('../json/novedades-deportivas.json')
    .then(res => res.json())
    .then(novedades => {
      const contenedorNovedades = document.getElementById('novedades-deportivas');
      novedades.forEach(novedad => {
        const section = document.createElement('section');
        section.classList.add("novedad");
        section.innerHTML = `
          <h3>${novedad.titulo}</h3>
          <div class="texto-foto">
              <p>${novedad.contenido}</p>
              <img src="${novedad.imagen}" class="${novedad.nombre}" width="${novedad.width}" height="${novedad.height}" alt="${novedad.nombre}" />
          </div>
        `;
        contenedorNovedades.appendChild(section);
      });
    })
    .catch(err => console.error("Error al cargar novedades deportivas:", err));

  fetch('../json/novedad-semana.json')
    .then(res => res.json())
    .then(novedades => {
      const novedad = novedades[0];
      const contenedor = document.getElementById('novedad-semana');
  
      const section = document.createElement('section');
      section.classList.add("novedad");
      section.innerHTML = `
        <h3>${novedad.titulo}</h3>
        <div class="texto-foto">
          <p>${novedad.contenido}</p>
          <img src="${novedad.imagen}" alt="${novedad.nombre}" width="${novedad.width}" height="${novedad.height}" class="${novedad.nombre}" />
        </div>
      `;
      contenedor.appendChild(section);
    })
    .catch(err => console.error("Error al cargar la novedad de la semana:", err));;
});