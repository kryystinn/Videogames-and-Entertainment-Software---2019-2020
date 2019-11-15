class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50, 3);
        this.disparosJugador = [];

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));
        this.disparosEnemigo = [];

        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);
        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);
        this.fondoVida = new Fondo(imagenes.corazon, 480*0.1, 320*0.05);

        this.vidaJugador =  new Texto(this.jugador.vida, 480*0.15, 320*0.07);
        this.puntos = new Texto(0,480*0.9,320*0.07 );

        this.bombas = [];

    }

    actualizar (){

        // Fondo
        this.fondo.vx = -1;
        this.fondo.actualizar();

        // Jugador

        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }


        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }

        // Disparos enemigos
        if(this.iteracionesDisparoEnemigos == null)
            this.iteracionesDisparoEnemigos = 150;
        this.iteracionesDisparoEnemigos++;

        if(this.iteracionesDisparoEnemigos > 200)
            for(var i=0; i<this.enemigos.length; i++){
                var disparo = this.enemigos[i].disparar();
                if ( disparo != null )
                    this.disparosEnemigo.push(disparo);
                this.iteracionesDisparoEnemigos = 0;
            }
        for (var i = 0; i < this.disparosEnemigo.length; i++)
            this.disparosEnemigo[i].actualizar();

        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos --;

        if ( this.iteracionesCrearEnemigos < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Enemigo(rX,rY));
            this.iteracionesCrearEnemigos = 110;
        }

        // Actualizar jugador
        this.jugador.actualizar();

        // Actualizar enemigos
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }

        // Actualizar disparos jugador
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // Colisión enemigo - jugador
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                if (this.jugador.vida ==  1)
                    this.iniciar();
                else {
                    this.jugador.vida--;
                    this.vidaJugador.valor = this.jugador.vida;
                    this.enemigos.splice(i, 1);
                }
            }
        }

        // colisiones , disparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null && this.enemigos[j] != null && this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    if (this.enemigos[j].vida == 1) {
                        this.disparosJugador.splice(i, 1);
                        this.enemigos.splice(j, 1);
                        this.puntos.valor++;
                    } else {
                        this.disparosJugador.splice(i, 1);
                        this.enemigos[j].vida--;
                    }
                }
            }
        }

        // Colisión disparo enemigo - jugador
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            if (this.jugador.colisiona(this.disparosEnemigo[i])) {
                if (this.jugador.vida == 1)
                    this.iniciar();
                else {
                    this.jugador.vida--;
                    this.vidaJugador.valor = this.jugador.vida;
                    this.disparosEnemigo.splice(i, 1);
                }
            }
        }

        // BOMBAS

        // Generar bombas
        if (this.iteracionesCrearBombas == null)
            this.iteracionesCrearBombas = 0;
        this.iteracionesCrearBombas++;

        if (this.iteracionesCrearBombas > 500){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.bombas.push(new Bomba(rX,rY));
            this.iteracionesCrearBombas = 0;
        }

        // Actualizar bombas
        for (var i=0; i < this.bombas.length; i++){
            this.bombas[i].actualizar();
        }

        // Colisión jugador - bomba
        for (var i = 0; i < this.bombas.length; i++){
            if (this.jugador.colisiona(this.bombas[i])){
                this.bombas.splice(i, 1);
                var count = 0;
                for (var j = 0; j < this.enemigos.length; j++){
                    if (this.enemigos[j].estaEnPantalla() && this.enemigos[j] != null)
                        count++;
                }
                this.puntos.valor += count;
                this.enemigos = [];
            }
        }

    }


    dibujar (){

        this.fondo.dibujar();
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }


        this.jugador.dibujar();


        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

        this.fondoVida.dibujar();
        this.vidaJugador.dibujar();

        for(var i=0; i < this.disparosEnemigo.length; i++)
            this.disparosEnemigo[i].dibujar();

        for (var i = 0; i < this.bombas.length; i++)
            this.bombas[i].dibujar();
    }


    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }
        }

        // Cambiar naves

        if (controles.nave == 1){
            this.jugador = new Jugador(this.jugador.x, this.jugador.y, this.jugador.vida);
        }
        else if (controles.nave == 2){
            this.jugador = new Jugador2(this.jugador.x, this.jugador.y, this.jugador.vida);
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
