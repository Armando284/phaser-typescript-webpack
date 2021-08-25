export default class MainScene extends Phaser.Scene {

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('tiles', '../assets/map/[Base]BaseChip_pipo.png');
    this.load.image('reliebe', '../assets/map/[A]Grass1-Dirt2_pipo.png');
    this.load.tilemapTiledJSON('map', '../assets/map/welcome.json');
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
    const layer3 = map.createLayer('objects', tileset, 0, 0);
    layer3.setCollisionByProperty({ obstacle: true });
  }

  update() { }
}