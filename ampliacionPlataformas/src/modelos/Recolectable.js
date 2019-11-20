class Recolectable extends Modelo {

    constructor(x, y) {
        super(imagenes.icono_recolectable, x, y)

        this.aStanding = new Animacion(imagenes.recolectable, this.ancho, this.alto, 6, 8);

        // Ref a la animación actual
        this.animacion = this.aStanding;
    }

    actualizar (){
        // Actualizar animación
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

}