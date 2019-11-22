class EnemigoNinja extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y)

        this.estado = estados.moviendo;
        this.aMoverDcha = new Animacion(imagenes.ninja_dcha, this.ancho, this.alto, 6, 3);
        this.aMoverIzqda = new Animacion(imagenes.ninja_izqda, this.ancho, this.alto, 6, 3);
        this.aMorir = new Animacion(imagenes.ninja_morir,
            this.ancho,this.alto,6,3, this.finAnimacionMorir.bind(this));

        // Ref a la animación actual
        this.animacion = this.aMoverIzqda;

        this.vxInteligencia = -1;
        this.vx = this.vxInteligencia;
        this.vy = 0;

    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    actualizar (){
        this.animacion.actualizar();

        switch (this.estado){
            case estados.moviendo:
                if (this.vx < 0) {
                    this.animacion = this.aMoverIzqda;
                }
                if (this.vx > 0) {
                    this.animacion = this.aMoverDcha;
                }
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
        }

        if ( this.estado == estados.muriendo) {
            this.vx = 0;
        } else {
            if ( this.vx == 0){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
        }

    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }


    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }


}