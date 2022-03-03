export class RailwayImage extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    point: Phaser.Math.Vector2,
    image: string,
    tint: number,
    tangent: Phaser.Math.Vector2,
    onClick: () => void
  ) {
    super(scene, point.x, point.y, image);
    this.displayHeight = 32;
    this.displayWidth = 64;
    this.setScale(0.5);
    this.rotate(tangent);
    this.setTint(tint);
    this.setInteractive();
    this.on("pointerdown", (pointer: any) => {
      onClick();
    });
  }

  rotate(tangent: Phaser.Math.Vector2) {
    this.rotation =
      Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) +
      Phaser.Math.PI2 / 4;
  }

  update(x: number, y: number, tangent: Phaser.Math.Vector2) {
    this.setPosition(x, y);
    this.rotate(tangent);
  }
}
