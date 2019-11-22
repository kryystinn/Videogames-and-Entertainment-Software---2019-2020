class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(1);

        this.botonSalto = new Boton(imagenes.boton_salto,480*0.9,320*0.55);
        this.botonDisparo = new Boton(imagenes.boton_disparo,480*0.75,320*0.83);
        this.pad = new Pad(480*0.14,320*0.8);


        this.scrollX = 0;
        this.bloques = [];
        this.saltadores = [];

        this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);

        this.enemigos = [];
        this.disparosEnemigo = [];
        this.recolectables = [];


        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);


        this.disparosJugador = []
        this.puntos = new Texto(0,480*0.9,320*0.07 );
        this.cargarMapa("res/"+nivelActual+".txt");
    }

    actualizar (){
        this.espacio.actualizar();

        if ( this.copa.colisiona(this.jugador)){
            nivelActual++;
            this.saved = null;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.iniciar();
        }



        // Jugador se cae
        if ( this.jugador.y > 480 ){
            this.iniciar();
        }

        // Eliminar disparos sin velocidad
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }


        // Disparos enemigos
        if(this.iteracionesDisparoEnemigos == null)
            this.iteracionesDisparoEnemigos = 150;
        this.iteracionesDisparoEnemigos++;

        if(this.iteracionesDisparoEnemigos > 200)
            for(var i=0; i<this.enemigos.length; i++){
                if (this.enemigos[i] instanceof EnemigoNinja){
                    var disparo = this.enemigos[i].disparar();
                    if ( disparo != null )
                        this.disparosEnemigo.push(disparo);
                    this.iteracionesDisparoEnemigos = 0;
                }

            }
        for (var i = 0; i < this.disparosEnemigo.length; i++)
            this.disparosEnemigo[i].actualizar();


        // elementos fuera
        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);

                this.enemigos.splice(j, 1);
                j = j-1;
            }
        }


        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        // Recolectables
        for (var i = 0; i < this.recolectables.length; i++)
            this.recolectables[i].actualizar();

        //Colisión jugador-recolectable.
        for (var i = 0; i < this.recolectables.length; i++)
            if (this.jugador.colisiona(this.recolectables[i]) && this.recolectables[i] != null) {
                this.espacio.eliminarCuerpoDinamico(this.recolectables[i])
                this.recolectables.splice(i, 1);
                this.puntos.valor += 10;
            }



        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // colisiones
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.iniciar();
            }
        }
        // colisiones , disparoJugador - enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null && this.enemigos[j].estado != estados.muriendo && this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    this.espacio .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
                    this.enemigos[j].impactado();

                    this.puntos.valor++;
                }
            }
        }

        // Colisión disparo enemigo - jugador
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            if (this.jugador.colisiona(this.disparosEnemigo[i])) {
                this.iniciar();
                }
            }

        // Colisión disparo jugador - disparo enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.disparosEnemigo.length; j++) {
                if (this.disparosJugador[i].colisiona(this.disparosEnemigo[j])){
                    this.disparosJugador.splice(i,1);
                    this.disparosEnemigo.splice(i, 1);
                }
            }
        }

        //PUNTO DE SALVADO.
        //Colisión jugador-bandera.
        if (this.flag != null && this.jugador.colisiona(this.flag)) {
            this.flag = new Bloque(imagenes.saved_flag, this.flag.x, this.flag.y);
            this.saved = true;
        }

    }

    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }
        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

    }


    dibujar (){
        this.calcularScroll();

        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }

        this.copa.dibujar(this.scrollX);

        if (this.flag != null)
            this.flag.dibujar(this.scrollX);

        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX);
        }


        this.jugador.dibujar(this.scrollX);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX);
        }

        for(var i=0; i<this.recolectables.length; i++)
            this.recolectables[i].dibujar(this.scrollX);

        for(var i=0; i<this.saltadores.length; i++)
            this.saltadores[i].dibujar(this.scrollX);

        for(var i=0; i < this.disparosEnemigo.length; i++)
            this.disparosEnemigo[i].dibujar();

        // HUD
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

        if ( !this.pausa && entrada == entradas.pulsaciones) {
            this.botonDisparo.dibujar();
            this.botonSalto.dibujar();
            this.pad.dibujar();
        }

    }


    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);

            }


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
        if (controles.moverY > 0){
            if (this.saltadores.length != 0){
                for (var i = 0; i < this.saltadores.length; i++) {
                    if (this.jugador.colisiona(this.saltadores[i]))
                        this.jugador.saltar(22);
                }
                this.jugador.saltar(16);
            }
            else
                this.jugador.saltar(16);
        }
    }


    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];

                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "C":
                this.copa = new Bloque(imagenes.copa, x, y);
                this.copa.y = this.copa.y - this.copa.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.copa);
                break;

            case "E":
                var enemigo = new EnemigoNave(x, y);

                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;

            case "A":
                this.flag = new Bloque(imagenes.flag, x, y);
                this.flag.y = this.flag.y - this.flag.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.flag);
                break;

            case "N":
                var ninja = new EnemigoNinja(x, y);

                ninja.y = ninja.y - ninja.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(ninja);
                this.espacio.agregarCuerpoDinamico(ninja);
                break;
            case "1":
                if (this.saved == null || !this.saved){
                    this.jugador = new Jugador(x, y);
                }
                else{
                    this.jugador = new Jugador(this.flag.x, this.flag.y);
                }
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "R":
                var recolectable = new Recolectable(x, y);
                recolectable.y = recolectable.y - recolectable.alto / 2;
                this.recolectables.push(recolectable);
                this.espacio.agregarCuerpoDinamico(recolectable);
                break;
            case "Y":
                this.plataformaSalto = new Bloque(imagenes.jelly, x, y);
                this.plataformaSalto.y = this.plataformaSalto.y - this.plataformaSalto.alto / 2;
                this.saltadores.push(this.plataformaSalto);
                this.espacio.agregarCuerpoEstatico(this.plataformaSalto);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

    calcularPulsaciones(pulsaciones){
        // Suponemos botones no estan pulsados
        this.botonDisparo.pulsado = false;
        this.botonSalto.pulsado = false;

        // suponemos que el pad está sin tocar
        controles.moverX = 0;



        for(var i=0; i < pulsaciones.length; i++){
            if (this.pad.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                var orientacionX = this.pad.obtenerOrientacionX(pulsaciones[i].x);
                if ( orientacionX > 20) { // de 0 a 20 no contabilizamos
                    controles.moverX = 1;
                }
                if ( orientacionX < -20) { // de -20 a 0 no contabilizamos
                    controles.moverX = -1;
                }
            }


            if (this.botonDisparo.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonDisparo.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.disparo = true;
                }
            }

            if (this.botonSalto.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonSalto.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }

        }

        // No pulsado - Boton Disparo
        if ( !this.botonDisparo.pulsado ){
            controles.disparo = false;
        }

        // No pulsado - Boton Salto
        if ( !this.botonSalto.pulsado ){
            controles.moverY = 0;
        }
    }


}
