import Phaser from 'phaser';

class PlayGame extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  constructor() {
    super('PlayGame');
  }
  preload() {
    this.load.image('logo', './assets/images/phaser.png');
  }
  create() {
    this.image = this.add.image(400, 300, 'logo');
  }
  update() {
    // this.image.rotation += 0.01;
  }
}

const configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#111111',
  type: Phaser.AUTO,
  parent: 'game_container',
  width: '100%',
  height: '100%',
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: PlayGame
};

new Phaser.Game(configObject);