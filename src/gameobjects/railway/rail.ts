export class Rail extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    point: Phaser.Math.Vector2,
    image: string,
    tint: number,
    tangent: Phaser.Math.Vector2
  ) {
    super(scene, point.x, point.y, image);
    this.displayHeight = 32;
    this.displayWidth = 64;
    this.setScale(0.5);
    this.rotate(tangent);
    this.setTint(tint);
  }

  rotate(tangent: Phaser.Math.Vector2) {
    this.rotation =
      Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) +
      Phaser.Math.PI2 / 4;
  }

  update(point: Phaser.Math.Vector2, tangent: Phaser.Math.Vector2) {
    this.setPosition(point.x, point.y);
    this.rotate(tangent);
  }
}
