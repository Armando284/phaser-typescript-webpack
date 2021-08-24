import Phaser from 'phaser';
import Welcome from './scenes/welcome.scene';


const configObject: Phaser.Types.Core.GameConfig = {
  backgroundColor: '#000000',
  type: Phaser.AUTO,
  parent: 'game_container',
  width: '100%',
  height: '100%',
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: Welcome
};

new Phaser.Game(configObject);