import { width, height } from '../helpers/screen.helper';

export default class GameWinScene extends Phaser.Scene {

  gamewin: Phaser.GameObjects.Image;
  width: number;
  height: number;
  music: any;

  constructor() {
    super('GameWinScene');
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.image('win', '../assets/ui/game-win.png');
    this.load.audio('gamewin_audio', '../assets/musics/theme-2.ogg');
  }

  create() {
    this.gamewin = this.add.image(this.width / 2, this.height / 2, 'over')
      .setScrollFactor(0)
      .setDepth(20)
      .setInteractive({ cursor: 'pointer' });

    this.music = this.sound.add('gameover_audio');
    this.music.volume = 0.25;
    this.music.loop = true;
    this.music.play();

    this.gamewin.on('pointerdown', () => {
      this.scene.stop();
      this.music.stop();
      this.scene.start('WelcomeScene');
    }, this);
  }

  update() { }
}