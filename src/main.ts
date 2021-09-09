import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import WelcomeScene from './scenes/welcome.scene';
import MainScene from './scenes/main.scene';
import GameWinScene from './scenes/gamewin.scene';
import GameOverScene from './scenes/gameover.scene';

import { width, height } from './helpers/screen.helper'


const configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#000000',
  type: Phaser.AUTO,
  roundPixels: true,
  parent: 'game_container',
  width: width,
  height: height,
  scale: {
    zoom: 2
  },
  scene: [
    WelcomeScene,
    MainScene,
    GameWinScene,
    GameOverScene
  ],
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      },
    ],
  },
};

new Phaser.Game(configObject);