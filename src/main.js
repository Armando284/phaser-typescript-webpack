import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {
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

let config = {
  width: 800,
  height: 600,
  parent: 'game_container',
  scene: PlayGame
};

new Phaser.Game(config);