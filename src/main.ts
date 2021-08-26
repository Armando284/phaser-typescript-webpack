import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import WelcomeScene from './scenes/welcome.scene';
import MainScene from './scenes/main.scene';
import GameOverScene from './scenes/gameover.scene';

import { width, height } from './helpers/screen.helper'


const configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#ffffff',
  type: Phaser.AUTO,
  parent: 'game_container',
  width: width,
  height: height,
  scale: {
    zoom: 2
  },
  scene: [
    WelcomeScene,
    MainScene,
    GameOverScene
  ],
  physics: {
    default: 'matter',
    matter: {
      debug: true,
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