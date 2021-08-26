import { width, height } from '../helpers/screen.helper';
export default class Player extends Phaser.Physics.Matter.Sprite {

  inputKeys: any;
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

    const playerCollider = bodies.circle(this.x, this.y, 12, {
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
  }

  static preload(scene: Phaser.Scene) {

    scene.load.atlas(
      'knight',
      'assets/character/knight.png',
      'assets/character/knight_atlas.json'
    );
    scene.load.animation('knight_anim', 'assets/character/knight_anim.json');

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

  getHit(): void {
    const text = this.scene.add.text(
      this.x,
      this.y - 64,
      `!!!`,
      {
        font: "32px Arial",
        color: "#ed1c24",
      }
    ).setDepth(10);
    setTimeout(() => {
      text.visible = false;
      this.scene.scene.stop();
      this.scene.scene.start('GameOverScene');
    }, 600);
  }
}