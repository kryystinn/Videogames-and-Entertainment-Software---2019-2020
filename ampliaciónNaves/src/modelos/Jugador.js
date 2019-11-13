class Jugador extends Modelo {

    constructor(x, y, vida) {
        super(imagenes.jugador , x, y, vida)
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
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }

    }

}
