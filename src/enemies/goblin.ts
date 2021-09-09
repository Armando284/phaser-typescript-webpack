import Player from '../characters/player';
import { width, height } from '../helpers/screen.helper';

export default class Goblin extends Phaser.Physics.Matter.Sprite {

  width: number;
  height: number;
  target: Player | null;
  RANGE: number;
  SPEED: number;
  HP: number;
  healthbar: Phaser.GameObjects.Sprite;

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
      restitution: 0.8
    });

    this.setBounce(1);
    this.setMass(10);
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.width = width;
    this.height = height;
    this.RANGE = 256;
    this.SPEED = 2;
    this.HP = 16;

    this.healthbar = this.scene.add.sprite(
      this.x,
      this.y - 32,
      "gui",
      "gui0_22"
    ).setDepth(15).setAlpha(1).setScale(1, 0.5);
  }

  static preload(scene: Phaser.Scene) {

    scene.load.atlas(
      'goblin',
      'assets/mobs/goblin.png',
      'assets/mobs/goblin_atlas.json'
    );
    scene.load.animation('goblin_anim', 'assets/mobs/goblin_anim.json');

    scene.load.atlas("gui", "assets/gui/gui.png", "assets/gui/gui_atlas.json");
    scene.load.animation("gui_anim", "assets/gui/gui_anim.json");
  }

  update() {
    if (this.target == null) this.anims.stop();
    if (this.target) {
      const targetx = this.target.x <= this.x ? this.target.x + 14 : this.target.x - 14;
      const targety = this.target.y <= this.y ? this.target.y + 14 : this.target.y - 14;
      const [dx, dy] = [targetx - this.x, targety - this.y];
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

      } else this.anims.stop();

      this.healthbar.x = this.x;
      this.healthbar.y = this.y - 32;
    }
  }

  chase(player: Player) {
    this.target = player;
  }

  getHit(damage: number): void {
    const text = this.scene.add.text(
      this.x,
      this.y - 64,
      `-${damage}`,
      {
        font: "32px Arial",
        color: "#ed1c24",
      }
    ).setDepth(10);
    setTimeout(() => {
      text.visible = false;
      this.HP -= damage;
      this.healthBarDown();
    }, 600);
  }

  healthBarDown(): void {
    switch (this.HP) {
      case 16 * 0.75:
        this.healthbar.anims.play("losthp1", true);
        break;
      case 16 * 0.5:
        this.healthbar.anims.play("losthp2", true);
        break;
      case 16 * 0.25:
        this.healthbar.anims.play("losthp3", true);
        break;
      case 0:
        this.healthbar.setVisible(false);
        break;
      default:
        break;
    }
  }
}