class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key:"SceneMainMenu"});
    }


    create(){
        console.log("Cena Criada");
        this.scene.start("SceneMain");
    }

}