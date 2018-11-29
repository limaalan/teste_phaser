var keyW;
var keyS;
var keyA;
var keyD;
class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });



    }

    preload() {

        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        this.load.atlas('megaset', 'assets/megaset-0.png', 'assets/megaset-0.json');
        //this.load.spritesheet(16,16,"player","assets/sprPlayer.png")

        this.load.spritesheet('player', 'assets/sprPlayer_test.png',
            { frameWidth: 16, frameHeight: 16 }
        );
    }

    create() {
        this.player = this.physics.add.sprite(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5, "player").setScale(2);

        this.cursors = this.input.keyboard.createCursorKeys();
        //this.particles = this.add.particles('flares');
        //var offscreen = new Phaser.Geom.Rectangle(-400, 0, 400, 600);
        //var screen = new Phaser.Geom.Rectangle(-400, 0, this.sys.game.config.width, this.sys.game.config.height);

        var offscreen = new Phaser.Geom.Rectangle(0, 0, 480, 20);
        var screen = new Phaser.Geom.Rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        //this.particles.createEmitter({
        this.add.particles('flares', [{
            //frame:  {source: customframes  },
            //x: 0,
            frame: ['red', 'yellow'],
            y: 16,
            follow: this.player,
            speed: { min: 100, max: 300 },
            angle: { min: 75, max: 115 },
            //angle :{ onEmit: function () { return customAngle; } },
            gravityY: 300,
            gravityX: 0,
            lifespan: 3000,
            scale: { start: 0.1, end: 1 },
            blendMode: 'NORMAL',
            //particlesBringToTop:true
            //on: { onEmit: function () { return atual; } }
            //deathZone: { type: 'onEnter', source: source }
        }]);


        this.add.particles('megaset', [
            {
                frame: ['rain'],
                emitZone: { source: offscreen },
                deathZone: { source: screen, type: 'onLeave' },
                frequency: 100,
                speedY: { min: 80, max: 120 },
                lifespan: 30000,
                scale: 0.5
            },
            {
                frame: ['purple_ball'],
                emitZone: { source: offscreen },
                deathZone: { source: screen, type: 'onLeave' },
                frequency: 150,
                speedY: { min: 150, max: 200 },
                lifespan: 30000,
                scale: 0.8
            },
            {
                frame: ['aqua_ball'],
                emitZone: { source: offscreen },
                deathZone: { source: screen, type: 'onLeave' },
                frequency: 500,
                quantity: 4,
                speedY: { min: 250, max: 300 },
                lifespan: 30000
            },
        ]);

        //Não consegui colocar separado
        //this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.W);
        /*keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.W);
        keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.S);
        keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.D);
        */

        //Animações
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'boost',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        //Variaveis do player
        this.movespeed = 200;



        var atual = false;
        var customframes = ['red'];
        var customAngle = 90;

        this.input.on('pointerup', function () {
            console.log(customframes, customAngle);
            atual = !atual;
            if (atual) {
                customframes = ['yellow'];
                customAngle = 95;
            } else {
                customframes = ['blue'];
                customAngle = 85;
            }

        });

        /*var movendo = {
            contains: function() {
                if (this.cursors.left.isDown ||this.cursors.right.isDown ||this.cursors.up.isDown ||this.cursors.down.isDown) {
                }
                else {
                    var frames= ['red'];        
                    return frames;
                }
    
            }
        
    
        };*/




    }

    update() {
        /*if (this.cursors.left.isDown ||this.cursors.right.isDown ||
            this.cursors.up.isDown ||this.cursors.down.isDown) {
                this.player.anims.play('boost', true);
                
                if(this.cursors.left.isDown){this.player.body.velocity.x= -this.movespeed;}
                if(this.cursors.right.isDown){this.player.body.velocity.x= this.movespeed;}
                if(this.cursors.up.isDown){this.player.body.velocity.y= -this.movespeed;}
                if(this.cursors.down.isDown){this.player.body.velocity.y= this.movespeed;}
            
            }else {
            this.player.anims.play('fly',true);
            this.player.body.velocity.x=0;
            }*/
        //Pra esquerda/direita
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.movespeed;

        }
        else if (this.cursors.right.isDown) {

            this.player.body.velocity.x = this.movespeed;

        }
        else {
            this.player.body.velocity.x = 0;

        }
        //Pra cima/baixo
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.movespeed;

        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.movespeed;

        }
        else {
            this.player.body.velocity.y = 0;

        }
        //Animacoes
        if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
            this.player.anims.play('boost', true);
        } else {
            this.player.anims.play('fly', true);
        }

        //this.player.x=Phaser.Math.Clamp(this.player.x, 0, this.sys.game.config.width);
        //this.player.y=Phaser.Math.Clamp(this.player.y, 0, this.sys.game.config.height);
        this.player.setCollideWorldBounds(true);
        //this.particles.x=this.player.x;
        //this.particles.y=this.player.y;
    }

}
