import { Point } from "../../geometry/point";

export class Handle extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    public point: Point,
    public pointRender: Point, // controls railway rendering
    public controllerOnDrag: (x: number, y: number) => void,
    public imageOffsetY: number,
		onClick: () => void,
  ) {
    super(scene, point.x, point.y + imageOffsetY, "controlPoint");
    this.setInteractive({ draggable: true });
		this.on("pointerdown", (pointer: any) => {onClick();});
  }

  move(x: number, y: number, valid: boolean) {
    this.setPosition(x, y + this.imageOffsetY);
    this.point.setPosition(x, y);
    if (valid) this.pointRender.setPosition(x, y);
  }

  onDrag(x: number, y: number) {
    this.controllerOnDrag(x, y - this.imageOffsetY);
  }
}
