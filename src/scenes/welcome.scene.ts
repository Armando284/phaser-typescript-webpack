export class Welcome extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  constructor() {
    super('Welcome');
  }
  preload() {
    this.load.image('logo', '../assets/images/phaser.png');
  }
  create() {
    this.image = this.add.image(400, 300, 'logo');
  }
  update() {
    // this.image.rotation += 0.01;
  }
}