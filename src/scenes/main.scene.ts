import Player from '../characters/player';
import Goblin from '../enemies/goblin';
import { width, height } from '../helpers/screen.helper';

export default class MainScene extends Phaser.Scene {

  player: Player;
  goblin: Goblin;
  width: number;
  height: number;

  constructor() {
    super('MainScene');
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.image('tiles', '../assets/map/[Base]BaseChip_pipo.png');
    this.load.image('reliebe', '../assets/map/[A]Grass1-Dirt2_pipo.png');
    this.load.tilemapTiledJSON('map', '../assets/map/welcome.json');
    Player.preload(this);
    Goblin.preload(this);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage(
      '[Base]BaseChip_pipo',
      'tiles',
      32,
      32,
      0,
      0
    );
    const reliebe = map.addTilesetImage(
      '[A]Grass1-Dirt2_pipo',
      'reliebe',
      32,
      32,
      0,
      0
    );
    const layer1 = map.createLayer('floor', tileset, 0, 0);
    const layer2 = map.createLayer('road', reliebe, 0, 0);
    const layer2b = map.createLayer('addons', tileset, 0, 0);
    const layer3 = map.createLayer('objects', tileset, 0, 0);
    layer3.setCollisionByProperty({ obstacle: true })
      .setDepth(10);
    this.matter.world.convertTilemapLayer(layer3);

    this.player = new Player({
      scene: this,
      x: this.width / 4,
      y: this.height,
      texture: 'knight',
      frame: 'preview_0',
    });

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.goblin = new Goblin({
      scene: this,
      x: 800,
      y: 800,
      texture: 'goblin',
      frame: 'enemy_19_0',
    });

    this.matter.world.setBounds(0, 0, 30 * 32, 30 * 32);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      .startFollow(this.player);

    this.matter.world.on('collisionstart', (event: any, bodyA: any, bodyB: any) => {
      // console.log('event', event);
      // console.log('*************************');
      // console.log('bodyA', bodyA);
      // console.log('*****************************');
      // console.log('bodyB', bodyB);

      if (bodyA.gameObject?.tile?.properties.thorns && bodyB.label === 'playerCollider') this.player.getHit();

      if (bodyA.label === 'playerCollider' && bodyB.label === 'goblinCollider') this.player.getHit();

      if (bodyA.label === 'playerSensor' && bodyB.label === 'goblinSensor') this.goblin.chase(this.player);
    });

  }

  update() {
    this.player?.update();
    this.goblin?.update();
  }
}