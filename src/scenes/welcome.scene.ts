export default class WelcomeScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  start: Phaser.GameObjects.Image;
  constructor() {
    super('WelcomeScene');
  }

  preload() {
    this.load.image('logo', '../assets/images/phaser.png');
    this.load.image('start', '../assets/ui/Button.png')
  }

  create() {
    this.background = this.add.image(960 / 2, 300, 'logo');
    this.start = this.add.image(960 / 2, 400, 'start')
      .setScale(0.3)
      .setInteractive({ cursor: 'pointer' })
      .setDepth(20)
      .setScrollFactor(0);
    this.start.on('pointerdown', () => {
      this.scene.start('MainScene');
    }, this);
  }

  update() {
    this.background.rotation += 0.01;
  }
}