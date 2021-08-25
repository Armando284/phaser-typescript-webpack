export default class GameOverScene extends Phaser.Scene {

  gameover: Phaser.GameObjects.Image;
  width: number;
  height: number;

  constructor() {
    super('GameOverScene');
  }

  preload() {
    this.load.image('over', '../assets/ui/game-over.png')
  }

  create() {
    this.width = Number(this.game.config.width);
    this.height = Number(this.game.config.height);
    this.gameover = this.add.image(this.width / 2, this.height / 2, 'over')
      .setScrollFactor(0)
      .setDepth(20)
      .setInteractive({ cursor: 'pointer' });
    this.gameover.on('pointerdown', () => {
      this.scene.start('WelcomeScene');
    }, this);
  }

  update() { }
}