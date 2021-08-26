import { width, height } from '../helpers/screen.helper';

export default class Goblin extends Phaser.Physics.Matter.Sprite {

  width: number;
  height: number;

  constructor(data: any) {
    const {
      scene,
      x,
      y,
      texture,
      frame
    } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    const { body, bodies } = this.scene.matter;

    const goblinCollider = bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "goblinCollider",
    });
    const goblinSensor = bodies.circle(this.x, this.y, 96, {
      isSensor: true,
      label: "goblinSensor",
    });

    const compoundBody = body.create({
      parts: [goblinCollider, goblinSensor],
      frictionAir: 0.35,
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.width = width;
    this.height = height;
  }

  static preload(scene: Phaser.Scene) {

    scene.load.atlas(
      'goblin',
      'assets/mobs/goblin.png',
      'assets/mobs/goblin_atlas.json'
    );
    scene.load.animation('goblin_anim', 'assets/mobs/goblin_anim.json');

  }

}