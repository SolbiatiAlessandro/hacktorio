import { Constants } from "../../constants";

import { Handle } from "../../gameobjects/controller/handle";

export class Line extends Phaser.GameObjects.Line {
  constructor(scene: Phaser.Scene, left: Handle, right: Handle) {
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
}
