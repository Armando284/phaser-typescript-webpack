import { width, height } from '../helpers/screen.helper';

export default class WelcomeScene extends Phaser.Scene {

  background: Phaser.GameObjects.Image;
  start: Phaser.GameObjects.Image;
  width: number;
  height: number;

  constructor() {
    super('WelcomeScene');
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.image('logo', '../assets/images/phaser.png');
    this.load.image('start', '../assets/ui/Button.png')
  }

  create() {
    this.background = this.add.image(this.width / 2, this.height / 2, 'logo')
      .setScale(0.5);
    this.start = this.add.image(this.width / 2, this.height - 50, 'start')
      .setScale(0.3)
      .setInteractive({ cursor: 'pointer' })
      .setDepth(20)
      .setScrollFactor(0);
    this.start.on('pointerdown', () => {
      this.scene.start('MainScene');
    }, this);
  }

  update() {
  }
}