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

}
