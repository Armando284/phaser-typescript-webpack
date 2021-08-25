export default class Player extends Phaser.Physics.Matter.Sprite {

  inputKeys: any;

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
    this.setFixedRotation();
  }

  static preload(scene: Phaser.Scene) {

    scene.load.atlas(
      "knight",
      "assets/character/knight.png",
      "assets/character/knight_atlas.json"
    );
    scene.load.animation("knight_anim", "assets/character/knight_anim.json");

  }

  move(playerVelocity: Phaser.Math.Vector2) {
    const speed = 2.5;
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    if (playerVelocity.y > 0) {
      this.anims.play("k_front", true);
    } else if (playerVelocity.y < 0) {
      this.anims.play("k_back", true);
    } else if (playerVelocity.y === 0) {
      if (playerVelocity.x > 0) {
        this.anims.play("k_right", true);
      } else if (playerVelocity.x < 0) {
        this.anims.play("k_left", true);
      }
    }
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
    }
    if (playerVelocity.x == 0 && playerVelocity.y == 0) {
      this.anims.stop();
    }
    this.scene.cameras.main.scrollX = this.x - Number(this.scene.game.config.width) / 2;
    this.scene.cameras.main.scrollY =
      this.y - Number(this.scene.game.config.height) / 2;
  }
}