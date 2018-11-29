var keyW;
var keyS;
var keyA;
var keyD;
class SceneMain extends Phaser.Scene {
    constructor (){
        super({key:"SceneMain"});

        
        
    }
    
    preload() {
        this.load.spritesheet('player','assets/sprPlayer_test.png',
            { frameWidth: 16, frameHeight: 16 }
    );
        //this.load.spritesheet(16,16,"player","assets/sprPlayer.png")
        
    }
    
    create(){
        this.player= this.physics.add.sprite(this.sys.game.config.width*0.5 , this.sys.game.config.height*0.5, "player");
        this.player.scale=2;
        this.cursors = this.input.keyboard.createCursorKeys();
       //this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.W);
        /*keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.W);
        keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.S);
        keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.Keycodes.D);
        */

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

        this.movespeed=200;
    }

    update(){
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
            this.player.body.velocity.x= -this.movespeed;
            
        }
        else if (this.cursors.right.isDown) {
            
            this.player.body.velocity.x= this.movespeed;
            
        }
        else{
            this.player.body.velocity.x=0;
            
        }
        //Pra cima/baixo
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y=-this.movespeed;
            
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y=this.movespeed;
            
        }
        else{
            this.player.body.velocity.y=0;
            
        }
        //Animacoes
        if(this.player.body.velocity.x !=0 || this.player.body.velocity.y!=0){
            this.player.anims.play('boost', true);
        } else {
            this.player.anims.play('fly', true);            
        }
        
        this.player.x=Phaser.Math.Clamp(this.player.x, 0, this.sys.game.config.width);
        this.player.y=Phaser.Math.Clamp(this.player.y, 0, this.sys.game.config.height);


    }

}
