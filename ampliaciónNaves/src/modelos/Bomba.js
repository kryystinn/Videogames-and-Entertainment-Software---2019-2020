class Bomba extends Modelo {

    constructor(x, y) {
        super(imagenes.bomba , x, y)
        this.vx = 1; // velocidadX
    }

    actualizar(){
        this.vx = -1;
        this.x = this.x + this.vx;
    }


}