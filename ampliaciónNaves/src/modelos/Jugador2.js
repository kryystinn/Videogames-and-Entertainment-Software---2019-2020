class Jugador2 extends Modelo {

    constructor(x, y, vida) {
        super(imagenes.jugador2 , x, y, vida)
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY
        this.vida = vida; // Vida del jugador

        // Disparo
        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

    }

    actualizar(){
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    moverX (direccion){
        this.vx = direccion * 6;
    }

    moverY (direccion){
        this.vy = direccion * 6;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoJugador2(this.x, this.y);
        } else {
            return null;
        }

    }

}
