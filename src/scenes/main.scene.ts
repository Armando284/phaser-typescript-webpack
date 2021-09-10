import Player from '../characters/player';
import Goblin from '../enemies/goblin';
import { width, height } from '../helpers/screen.helper';
import MapSection from '../interfaces/map_section.interface';

export default class MainScene extends Phaser.Scene {

  player: Player;
  goblin: Goblin;
  width: number;
  height: number;
  music: any;
  staff: Phaser.Physics.Matter.Sprite;

  constructor() {
    super('MainScene');
    this.width = width;
    this.height = height;
  }

  preload() {
    this.load.image('tiles', '../assets/map/[Base]BaseChip_pipo.png');
    this.load.image('reliebe', '../assets/map/[A]Grass1-Dirt2_pipo.png');
    this.load.tilemapTiledJSON('map', '../assets/map/welcome.json');
    this.load.audio('scene_main_audio', '../assets/musics/theme-4.ogg');
    this.load.atlas(
      "items",
      "assets/gui/items.png",
      "assets/gui/items_atlas.json"
    );

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

    this.music = this.sound.add('scene_main_audio');
    this.music.volume = 0.25;
    this.music.loop = true;
    this.music.play();

    this.staff = this.matter.add.sprite(24 * 32, 24 * 32, 'items', 'item_61').setName('staff').body.gameObject.setCircle(40).setSensor(true).setDisplayOrigin(-8, 40);

    this.player = new Player({
      scene: this,
      x: 15 * 32,
      y: 4 * 32,
      texture: 'knight',
      frame: 'preview_0',
    });

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    const goblinPos: MapSection = {
      xStart: 0,
      yStart: 256,
      xEnd: map.widthInPixels,
      yEnd: map.heightInPixels
    }
    this.goblin = new Goblin({
      scene: this,
      ...this.randomPos(goblinPos),
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

      if (bodyA.gameObject?.tile?.properties.thorns && bodyB.label === 'playerCollider') this.player.getHit(0.5);

      if (bodyA.label === 'playerCollider' && bodyB.label === 'goblinCollider') {
        this.player.getHit(1);
        this.goblin.startAttack();
      }

      if (bodyA.label === 'playerSensor' && bodyB.label === 'goblinSensor') this.goblin.chase(this.player);

      if (bodyA.gameObject?.name || bodyB.gameObject?.name) {
        if (
          (bodyA.label === 'playerCollider' && bodyB.gameObject.name === 'staff')
          ||
          (bodyB.label === 'playerCollider' && bodyA.gameObject.name === 'staff')
        ) this.player.getItem(this.staff);
      }
    });

    this.matter.world.on('collisionend', (event: any, bodyA: any, bodyB: any) => {
      if (bodyA.label === 'playerCollider' && bodyB.label === 'goblinCollider') {
        this.goblin.stopAttack();
      }
    });

  }

  randomPos({ xStart = 1, yStart = 1, xEnd = 1, yEnd = 1 }: MapSection): { x: number, y: number } {
    let [x, y] = [0, 0];

    const randomPosNumber = (from: number, to: number): number => {
      let pos: number = Math.random() * to;
      if (pos <= from) pos += from - pos;
      return pos;
    };

    x = randomPosNumber(xStart, xEnd);
    y = randomPosNumber(yStart, yEnd);

    return { x, y }
  }

  endScene() {
    this.player.setToSleep();
    this.goblin.setToSleep();
    this.music.stop();
    this.scene.stop();
  }

  gameOver(): void {
    this.endScene();
    this.scene.start('GameOverScene');
  }

  gameWin(): void {
    this.endScene();
    this.scene.start('GameWinScene');
  }

  update() {
    this.player?.update();
    this.goblin?.update();
    if (this.player.HP <= 0) this.gameOver();
    if (this.goblin.HP <= 0 && this.player.HP > 0) this.gameWin();
  }
}