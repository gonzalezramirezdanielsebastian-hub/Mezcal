document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('mezcales-grid');
  const modal = document.getElementById('modal-detalle');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');

  // Elementos dentro del modal
  const modalImg = document.getElementById('modal-img');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalAgave = document.getElementById('modal-agave');
  const modalDestileria = document.getElementById('modal-destileria');
  const modalDescripcion = document.getElementById('modal-descripcion');

  // Cargar los datos desde el archivo .json
  fetch('mezcales.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo mezcales.json');
      }
      return response.json();
    })
    .then(data => {
      renderizarTarjetas(data);
    })
    .catch(error => {
      console.error('Error al cargar la información:', error);
      gridContainer.innerHTML = `
        <div class="col-span-full text-center text-red-400 py-10">
          <p class="text-lg">Ocurrió un error al cargar la lista de expositores.</p>
          <p class="text-xs text-stone-500 mt-2">Asegúrate de ejecutar esto desde un servidor local (ej. Live Server en VS Code) para que el archivo JSON se lea correctamente.</p>
        </div>
      `;
    });

  // Función para construir la cuadrícula en HTML
  function renderizarTarjetas(mezcales) {
    gridContainer.innerHTML = '';

    mezcales.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card-mezcal bg-stone-800/80 border border-stone-700/60 rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between';

      card.innerHTML = `
        <div>
          <div class="h-48 w-full bg-stone-950 overflow-hidden relative">
            <img src="${item.imagen}" alt="${item.nombre}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'">
          </div>
          <div class="p-4">
            <span class="text-xs font-semibold px-2 py-0.5 bg-amber-950 text-amber-400 rounded border border-amber-700/40 uppercase tracking-wider">
              ${item.tipoAgave}
            </span>
            <h3 class="text-lg font-bold text-amber-500 mt-2 line-clamp-1">${item.nombre}</h3>
            <p class="text-xs text-stone-400 mt-1">${item.destileria || ''}</p>
          </div>
        </div>
        <div class="px-4 pb-4 pt-2">
          <button class="w-full py-2 px-3 bg-stone-700/50 hover:bg-amber-600/30 text-amber-200 text-xs font-medium rounded transition-colors text-center border border-amber-600/20">
            Ver Descripción
          </button>
        </div>
      `;

      // Evento de clic en la tarjeta
      card.addEventListener('click', () => abrirModal(item));

      gridContainer.appendChild(card);
    });
  }

  // Abrir la ventana emergente con los datos
  function abrirModal(item) {
    modalImg.src = item.imagen;
    modalTitulo.textContent = item.nombre;
    modalAgave.textContent = `Agave ${item.tipoAgave}`;
    modalDestileria.textContent = item.destileria ? `Producido por: ${item.destileria}` : '';
    modalDescripcion.textContent = item.descripcion;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Evita el scroll detrás del modal
  }

  // Cerrar modal al dar clic en la 'X'
  btnCerrarModal.addEventListener('click', cerrarModal);

  // Cerrar modal al hacer clic fuera del recuadro
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModal();
    }
  });

  function cerrarModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});