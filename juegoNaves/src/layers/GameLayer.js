class GameLayer extends Layer {
    constructor() {
        super();
        this.iniciar();
    }
    iniciar() {
        this.jugador = new Jugador(50, 50);
    }

    actualizar (){
    }

    dibujar (){
        this.jugador.dibujar();

    }

}
