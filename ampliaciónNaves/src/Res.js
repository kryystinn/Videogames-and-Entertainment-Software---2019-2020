// Lista re recursos a precargar
var imagenes = {
    jugador : "res/jugador.png",
    jugador2 : "res/jugador2.png",
    fondo : "res/fondo.png",
    enemigo : "res/enemigo.png",
    enemigo_movimiento : "res/enemigo_movimiento.png",
    disparo_jugador : "res/disparo_jugador.png",
    disparo_jugador2 : "res/disparo_jugador2.png",
    disparo_enemigo : "res/disparo_enemigo.png",
    icono_puntos : "res/icono_puntos.png",
    corazon: "res/corazon.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
