class DisparoEnemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.disparo_enemigo, x, y);
    }

    actualizar (){
        this.vx = -5;
        this.x = this.x + this.vx;
    }

}