export default class GameOverScene extends Phaser.Scene {

  gameover: Phaser.GameObjects.Image;

  constructor() {
    super('GameOverScene');
  }

  preload() {
    this.load.image('over', '../assets/ui/game-over.png')
  }

  create() {
    this.gameover = this.add.image(960 / 2, 150, 'over')
      .setScrollFactor(0)
      .setDepth(20)
      .setInteractive({ cursor: 'pointer' });
    this.gameover.on('pointerdown', () => {
      this.scene.start('WelcomeScene');
    }, this);
  }

  update() { }
}