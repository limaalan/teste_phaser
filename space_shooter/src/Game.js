class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super("SceneMainMenu");
    }


    create(){
        console.log("Cena Criada");
        //this.scene.start("SceneMain");
    }

}


class SceneMain extends Phaser.Scene {
    constructor (){
        super("SceneMain");
    }

}

class SceneGameOver extends Phaser.Scene{
    constructor() {
        super({key:"SceneGameOver"});
    }

}


var gameConfig = {
    type : Phaser.WEBGL,
    width : 480 ,
    height : 640 ,
    backgroudcolor :"black" ,
    physics: {
        default : "arcade",
        arcade : {
            gravity : {x:0,y:0}
        }
    },

    scene:[
        SceneMainMenu,
        SceneMain,
        SceneGameOver
    ],

    pixelArt : true,
    roundPixels : true
};


var game = new Phaser.Game(gameConfig);