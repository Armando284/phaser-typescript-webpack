import Player from '../characters/player';
import { width, height } from '../helpers/screen.helper';

export default class Goblin extends Phaser.Physics.Matter.Sprite {

  width: number;
  height: number;
  target: Player;
  RANGE: number;
  SPEED: number;


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
    const goblinSensor = bodies.circle(this.x, this.y, 256, {
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
    this.RANGE = 256;
    this.SPEED = 2;
  }

  static preload(scene: Phaser.Scene) {

    scene.load.atlas(
      'goblin',
      'assets/mobs/goblin.png',
      'assets/mobs/goblin_atlas.json'
    );
    scene.load.animation('goblin_anim', 'assets/mobs/goblin_anim.json');

  }

  update() {
    if (this.target) {
      const [dx, dy] = [this.target.x - this.x, this.target.y - this.y];
      const goblinVelocity = {
        x: Math.sign(dx) * this.SPEED,
        y: Math.sign(dy) * this.SPEED
      }

      if (Math.abs(dx) < this.RANGE && Math.abs(dy) < this.RANGE) {
        this.setVelocity(goblinVelocity.x, goblinVelocity.y);
        const rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);

        if (2 > rotation && rotation > 1) this.anims.play('front', true);
        else if (-2 < rotation && rotation < -1) this.anims.play('back', true);
        else if (1 >= rotation && rotation >= -1) this.anims.play('right', true);
        else if (2 <= rotation || rotation <= -2) this.anims.play('left', true);

      }
    }
  }

  chase(player: Player) {
    console.warn('Chase!!');
    this.target = player;

  }

}