var config = {
    type : Phaser.WEBGL,
    width : 480 ,
    height : 640 ,
    backgroudcolor :"black" ,
    physics: {
        default : "arcade",
        arcade : {
            gravity : {x=0,y=0}
        }
    },

    scene : [
        SceneGameMenu,
        SceneMain,
        SceneGameOver
    ],

    pixeArt : true,
    roundPixels : true
};

var game = new Phaser.Game(config);
