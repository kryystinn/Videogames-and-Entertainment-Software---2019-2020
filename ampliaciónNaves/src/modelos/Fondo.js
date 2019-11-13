class Fondo extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y)
    }

    actualizar(){
        if ( this.vx != 0) {
            if ( this.fondoAux == null){
                this.fondoAux =
                    new Fondo(this.imagen.src, this.x, this.y);
            }

            this.x = this.x + this.vx;

            // Margen derecho se sale por la izquierda
            if (this.x + this.ancho / 2 < 0) {
                // Aparece por la derecha
                this.x = 480 + this.ancho / 2;
            }
            // Margen izquierdo se sale por la derecha
            if (this.x - this.ancho / 2 > 480 ) {
                // Aparece por la izquierda
                this.x = 0 - this.ancho / 2;
            }
        }
    }

    dibujar(){
        super.dibujar();

        if ( this.fondoAux != null ) {
            if ( this.x - this.ancho/2 > 0){
                // Fondo auxiliar por la izquierda
                this.fondoAux.x = this.x - this.ancho;
            }

            if (this.x + this.ancho/2 < 480){
                // Fondo auxiliar por la derecha
                this.fondoAux.x =this.x + this.ancho;
            }
            this.fondoAux.dibujar();
        }
    }

}
