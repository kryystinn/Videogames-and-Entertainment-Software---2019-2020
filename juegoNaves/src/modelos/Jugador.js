class Jugador extends Modelo {
    constructor(x, y) {
        super(imagenes.jugador , x, y);
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY
    }

    actualizar(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }
    moverY (direccion){
        this.vy = direccion * 3;
    }


}
