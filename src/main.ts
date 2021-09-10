import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import WelcomeScene from './scenes/welcome.scene';
import MainScene from './scenes/main.scene';
import GameWinScene from './scenes/gamewin.scene';
import GameOverScene from './scenes/gameover.scene';

import { width, height } from './helpers/screen.helper';

const pluginConfig = {
  // The plugin class:
  plugin: PhaserMatterCollisionPlugin,
  // Where to store in Scene.Systems, e.g. scene.sys.matterCollision:
  key: "matterCollision" as "matterCollision",
  // Where to store in the Scene, e.g. scene.matterCollision:
  mapping: "matterCollision" as "matterCollision"
};

declare module "phaser" {
  interface Scene {
    [pluginConfig.mapping]: PhaserMatterCollisionPlugin;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace Scenes {
    interface Systems {
      [pluginConfig.key]: PhaserMatterCollisionPlugin;
    }
  }
}


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
    scene: [pluginConfig]
  },
};

new Phaser.Game(configObject);
