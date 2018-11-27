var game;

 
var gameOptions = {
    //número de 'fatias' da roda
    slices: 8,
    // cores das faixas e nome dos prêmios
    sliceColors: [0xff0000, 0x00ff00, 0x0000ff, 0xffffff, 0x00ffff, 0xffff00, 0x888888, 0Xff00ff],
    slicePrizes: ["RED", "GREEN", "BLUE", "WHITE", "CYAN", "YELLOW", "GREY", "PURPLE"],
 
    // Duração da rotação em ms
    rotationTime: 3000,
 
    // raio da roda, em pixels
    wheelRadius: 250
}
 
window.onload = function() {
    // objeto com as configurações do jogo
        var gameConfig = {
 
    // tipo de renderizador ???
       type: Phaser.CANVAS,
 
    // largura e altura da tela
       width: 600,    
       height: 600,
    // cor de fundo
       backgroundColor: 0x000000,
    // cenas usadas nesse jogo
       scene: [playGame, Cena2]
    };
 
    // construtur do jogo ???
    game = new Phaser.Game(gameConfig); // iniciando um jogo com as configurações acima
 

    /*// pure javascript to give focus to the page/frame and scale the game
    window.focus()
    resize();
    window.addEventListener("resize", resize, false); */
}
 
// Cena playgame
class playGame extends Phaser.Scene{
 
    // construtor
    constructor(){
        super("PlayGame"); // ???
    }
 
    // quando a cena carregar...
    preload(){
 
        // carregando recursos
        this.load.image("pin", "assets/pin.png");
    }
 
    // função a ser executada quando a cena for criada
    create(){
 
        // calculando o tamanho de cada fatia, com base nas opções (slices)
        var sliceDegrees = 360 / gameOptions.slices;
 
        // making a graphic object without adding it to the game ???
        var graphics = this.make.graphics({
            x: 0,
            y: 0,
            add: false
        });
 
        // looping through each slice
        for(var i = 0; i < gameOptions.slices; i++){
 
            // determina a cor , com base no vetor de cores
            graphics.fillStyle(gameOptions.sliceColors[i], 1);
 
            // desenha  a fatia 
            graphics.slice(gameOptions.wheelRadius,
                  gameOptions.wheelRadius, gameOptions.wheelRadius,
                  Phaser.Math.DegToRad(270 + i * sliceDegrees),
                  Phaser.Math.DegToRad(270 + (i  + 1) * sliceDegrees), false); 
            /*
            graphics.slice(gameOptions.wheelRadius,
            gameOptions.wheelRadius, gameOptions.wheelRadius,
            Phaser.Math.DegToRad( i * sliceDegrees),
            Phaser.Math.DegToRad(( + i  + 1) * sliceDegrees), false);
                */
            // preenche com a cor
            graphics.fillPath();
            console.log(gameOptions.slicePrizes[i]);
        }
 
        // generate a texture called "wheel" from graphics data
        graphics.generateTexture("wheel", gameOptions.wheelRadius * 2, gameOptions.wheelRadius * 2);
 
        // creating a sprite with wheel image as if it was a preloaded image
        this.wheel = this.add.sprite(game.config.width / 2, game.config.height / 2, "wheel");
 
        // adding the pin in the middle of the canvas
        this.pin = this.add.sprite(game.config.width / 2, game.config.height / 2, "pin");
 
        // adding the text field
        this.prizeText = this.add.text(game.config.width / 2, game.config.height - 20, "Roda a roda", {
            font: "bold 32px Arial",
            align: "center",
            color: "white"
        });
 
        // center the text
        this.prizeText.setOrigin(0.5);
 
        // the game has just started = we can spin the wheel
        this.canSpin = true;
 
        // waiting for your input, then calling "spinWheel" function
        this.input.on("pointerdown", this.spinWheel, this);
    }
 
    // function to spin the wheel
    spinWheel(){
 
        // can we spin the wheel?
        if(this.canSpin){
 
            // resetting text field
            this.prizeText.setText("");
 
            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);
 
            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);
 
            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = gameOptions.slices - 1 - Math.floor(degrees / (360 / gameOptions.slices));
            //var prize = gameOptions.slices -3 - Math.floor(degrees / (360 / gameOptions.slices));
            //var prize = Math.floor(degrees / (360 / gameOptions.slices));
 
            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;
 
            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.tweens.add({
 
                // adding the wheel to tween targets
                targets: [this.wheel],
 
                // angle destination
                angle: 360 * rounds + degrees,
                //angle: 360 * rounds + prize*(360/gameOptions.slices),
 
                // tween duration
                duration: gameOptions.rotationTime,
 
                // tween easing
                ease: "Cubic.easeOut",

                // callback scope
                callbackScope: this,
 
                // function to be executed once the tween has been completed
                onComplete: function(tween){
 
                    // displaying prize text
                    //this.prizeText.setText(gameOptions.slicePrizes[prize]+String(prize));
                    //this.prizeText.setText(prize);
 
                    // player can spin again
                    
                    this.canSpin = true;
                    
                    this.prizeText.setText("Prêmio: "+gameOptions.slicePrizes[prize]+" Click para sair")
                    
                    this.input.once('pointerdown', function () {

                        // tempo ?
                        console.log('Saindo da roda da fortuna...');
                        
                        this.scene.start('Cena2');

                    }, this);
                                
                

                }
            });
        }
    }
}
var Cena2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Cena2 ()
    {
        Phaser.Scene.call(this, { key: 'Cena2' });
    },

    preload: function ()
    {
        this.load.image('teste', 'assets/teste.png');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'teste');//.setAlpha(0.2);

        this.input.once('pointerdown', function () {

            console.log('Entrando para a roda da fortuna...');

            this.scene.start('PlayGame');

        }, this);
    }

});