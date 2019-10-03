class GameLayer extends Layer {
    constructor() {
        super();
        this.iniciar();
    }
    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);
    }

    actualizar (){
    }

    dibujar (){
        this.fondo.dibujar();
        this.jugador.dibujar();
    }
    procesarControles( ){
        // disparar
        if ( controles.disparo ){

        }
        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);
        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);
        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);
        } else {
            this.jugador.moverY(0);
        }

    }



}
