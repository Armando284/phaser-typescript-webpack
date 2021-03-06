import { width, height } from '../helpers/screen.helper';

export default class GameOverScene extends Phaser.Scene {

  gameover: Phaser.GameObjects.Image;
  width: number;
  height: number;
  music: any;

  constructor() {
    super('GameOverScene');
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.image('over', '../assets/ui/game-over.png');
    this.load.audio('gameover_audio', '../assets/musics/theme-13.ogg');
  }

  create() {
    this.gameover = this.add.image(this.width / 2, this.height / 2, 'over')
      .setScrollFactor(0)
      .setDepth(20)
      .setInteractive({ cursor: 'pointer' });

    this.music = this.sound.add('gameover_audio');
    this.music.volume = 0.25;
    this.music.loop = true;
    this.music.play();

    this.gameover.on('pointerdown', () => {
      this.scene.stop();
      this.music.stop();
      this.scene.start('WelcomeScene');
    }, this);
  }

  update() { }
}