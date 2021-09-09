import { width, height } from '../helpers/screen.helper';

export default class Player extends Phaser.Physics.Matter.Sprite {

  inputKeys: any;
  width: number;
  height: number;
  maxHP: number;
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

    const playerCollider = bodies.circle(this.x, this.y, 14, {
      isSensor: false,
      label: "playerCollider",
    });
    const playerSensor = bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });

    const compoundBody = body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.width = width;
    this.height = height;
    this.maxHP, this.HP = 4;

    this.scene.add.text(
      10,
      10,
      `HP:`,
      {
        font: "24px Arial",
        color: "#ed1c24",
      }
    ).setDepth(15).setScrollFactor(0);
    this.healthbar = this.scene.add.sprite(
      85,
      23,
      "gui",
      "gui0_22"
    ).setDepth(15).setAlpha(1).setScale(2, 1).setScrollFactor(0);
  }

  static preload(scene: Phaser.Scene) {

    scene.load.atlas(
      'knight',
      'assets/character/knight.png',
      'assets/character/knight_atlas.json'
    );
    scene.load.animation('knight_anim', 'assets/character/knight_anim.json');

    scene.load.atlas("gui", "assets/gui/gui.png", "assets/gui/gui_atlas.json");
    scene.load.animation("gui_anim", "assets/gui/gui_anim.json");
  }

  update() {
    let playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
      this.move(playerVelocity);
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
      this.move(playerVelocity);
    } else if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
      this.move(playerVelocity);
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
      this.move(playerVelocity);
    } else {
      this.setVelocity(0, 0);
      this.anims.stop();
    }
  }

  move(playerVelocity: Phaser.Math.Vector2): void {
    const speed = 3;
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    if (playerVelocity.y > 0) {
      this.anims.play('k_front', true);
    } else if (playerVelocity.y < 0) {
      this.anims.play('k_back', true);
    } else if (playerVelocity.y === 0) {
      if (playerVelocity.x > 0) {
        this.anims.play('k_right', true);
      } else if (playerVelocity.x < 0) {
        this.anims.play('k_left', true);
      }
    }
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
      case 3:
        this.healthbar.anims.play("losthp1", true);
        break;
      case 2:
        this.healthbar.anims.play("losthp2", true);
        break;
      case 1:
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
