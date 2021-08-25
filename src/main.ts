import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import WelcomeScene from './scenes/welcome.scene';
import MainScene from './scenes/main.scene';
import GameOverScene from './scenes/gameover.scene';


const configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#000000',
  type: Phaser.AUTO,
  parent: 'game_container',
  width: 1000,
  height: 500,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: [
    WelcomeScene,
    MainScene,
    GameOverScene
  ],
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};

new Phaser.Game(configObject);