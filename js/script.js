//selectores
const btnCerrar = document.querySelector('#btn-cerrar');
const btnSiguiente = document.querySelector('#btn-siguiente');
const btnAnterior = document.querySelector('#btn-anterior');
const imagenes = document.querySelectorAll('#imagenes img');
const lightbox = document.querySelector('#cont-principal');
const imagenActiva = document.querySelector('#img-activa');
const audioBackground = document.querySelector('#audio-background');
// const body = document.body;

let indiceImagen = 0;

//abre el Lightbox
const abreLightbox = (event) => {
  imagenActiva.src = event.target.src;
  lightbox.style.display = 'flex';
  indiceImagen = Array.from(imagenes).indexOf(event.target);
};

imagenes.forEach((imagen) => {
  imagen.addEventListener('click', abreLightbox);
});

//cierra el Lightbox
const cerrarLightbox = () => {
  audioBackground.pause();
  audioBackground.currentTime = 0;

  lightbox.style.display = 'none';
} 

btnCerrar.addEventListener('click', cerrarLightbox);

//ir a la siguiente imagen
const siguienteImagen = () => {
  if (indiceImagen === imagenes.length - 1) {
    indiceImagen = -1;
  }
  imagenActiva.src = imagenes[indiceImagen + 1].src;
  indiceImagen++;
};

btnSiguiente.addEventListener('click', siguienteImagen);



//ir a la imagen anterior
const anteriorImagen = () => {
  if (indiceImagen === 0) {
    indiceImagen = imagenes.length;
  }
  imagenActiva.src = imagenes[indiceImagen - 1].src;
  indiceImagen--;
};


btnAnterior.addEventListener('click', anteriorImagen);



document.addEventListener('keydown', (event) =>{
  if(event.key === 'ArrowRight') {
    siguienteImagen()
  }
});


document.addEventListener('keydown', (event) =>{
  if(event.key === 'ArrowLeft') {
    anteriorImagen()
  }
});

document.addEventListener('keydown', (event) =>{
  if(event.key === 'Escape') {
    cerrarLightbox()
  }
});


// cerrar lightbox cuando se haga click fuera de la img activa
/*
 document.body.addEventListener('click', (event) => {
  if (event.target !== imagenActiva) {
    cerrarLightbox();
  }
});
*/


// mostrar audio en solo en la primer img activa (por defecto) y ocultar en las img posteriores
imagenActiva.addEventListener("load", () => {
    // Verifica si la imagen activa es la primera
    if (indiceImagen === 0) {
      audioBackground.style.display = "block"; // Muestra el reproductor de audio 
      setTimeout(function() {
        audioBackground.play(); // Reproduce el audio
      }, 250); // el audio inicia automaticamente  luego de 250ms
      
      // audioBackground.removeAttribute("hidden"); // Muestra el reproductor de audio
    }
    else{
      audioBackground.style.display = "none"; // Oculta el reproductor de audio
      audioBackground.pause();      
      // audioBackground.setAttribute("hidden", "true"); // Oculta el reproductor de audio
    }
});
