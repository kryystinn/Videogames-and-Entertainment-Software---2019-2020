class DisparoEnemigo extends Modelo {

    constructor(imagen, x, y, vx) {
        super(imagen, x, y);
        this.vxEnemigo = vx;
    }

    actualizar (){
        if (this.vxEnemigo > 0)
            this.vx = 5
        else
            this.vx = -5;
        this.x = this.x + this.vx;
    }

}