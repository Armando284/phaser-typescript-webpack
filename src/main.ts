import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  constructor() {
    super("PlayGame");
  }
  preload() {
    this.load.image('logo', './assets/images/phaser.png');
  }
  create() {
    this.image = this.add.image(400, 300, 'logo');
  }
  update() {
    this.image.rotation += 0.01;
  }
}

const configObject: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game_container',
    width: 800,
    height: 600
  },
  scene: PlayGame
};

new Phaser.Game(configObject);