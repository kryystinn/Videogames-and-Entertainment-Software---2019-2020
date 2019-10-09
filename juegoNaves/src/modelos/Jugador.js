class Jugador extends Modelo {
    constructor(x, y) {
        super(imagenes.jugador, x, y);
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Disparo
        this.cadenciaDisparo = 30; // 1 segundo
        this.tiempoDisparo = 0;
    }

    actualizar() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }
    }

    moverX(direccion) {
        this.vx = direccion * 3;
    }

    moverY(direccion) {
        this.vy = direccion * 3;
    }

    disparar() {
        if (this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }

    }

}
