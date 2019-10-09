class GameLayer extends Layer {
    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);

        this.disparosJugador = []

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300, 50));
        this.enemigos.push(new Enemigo(350, 200));
    }

    actualizar() {
        this.jugador.actualizar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }

        // disparos
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                this.iniciar();
            }
        }
    }

    dibujar() {
        this.fondo.dibujar();
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }
        this.jugador.dibujar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar();
        }

    }

    procesarControles() {
        // disparar
        if (controles.disparo) {
            var nuevoDisparo = this.jugador.disparar();
            if (nuevoDisparo != null) {
                this.disparosJugador.push(nuevoDisparo);
            }

        }
        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);
        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);
        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(-1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(1);
        } else {
            this.jugador.moverY(0);
        }

    }


}
