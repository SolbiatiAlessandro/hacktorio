import { Point } from "../../geometry/point";

export class Handle extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    point: Point,
    public controllerOnDrag: (x: number, y: number) => void
  ) {
    super(scene, point.x, point.y, "controlPoint");
    this.setInteractive({ draggable: true });
  }

  onDrag(x: number, y: number) {
    this.controllerOnDrag(x, y);
  }
}
