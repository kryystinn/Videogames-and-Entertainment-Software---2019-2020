class DisparoJugador2 extends Modelo {

    constructor(x, y) {
        super(imagenes.disparo_jugador2, x, y)
        this.vx = 12;
    }

    actualizar (){
        this.x = this.x + this.vx;
    }

}
