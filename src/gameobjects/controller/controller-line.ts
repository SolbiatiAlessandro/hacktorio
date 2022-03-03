import { Constants } from "../../constants";

import { ControllerHandle } from "../../gameobjects/controller/controller-handle";

export class ControllerLine extends Phaser.GameObjects.Line {
  constructor(
    scene: Phaser.Scene,
    left: ControllerHandle,
    right: ControllerHandle
  ) {
    super(
      scene,
      0,
      0,
      left.x,
      left.y,
      right.x,
      right.y,
      Constants.PRIMARY_COLOR,
      0.8
    );
    this.setOrigin(0, 0);
  }

  move(left: ControllerHandle, right: ControllerHandle) {
    this.setTo(left.x, left.y, right.x, right.y);
  }

  setTint(color: number) {
    this.setStrokeStyle(0.5, color, 1);
  }
}
