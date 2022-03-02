import { Constants } from "../../constants";
import { Events } from "../../events";

import { Point } from "../../geometry/point";

import { GameObjectOnGraph } from "../../interfaces/graph.interface";

import { Handle } from "../../gameobjects/controller/handle";
import { Line } from "../../gameobjects/controller/line";
import { GameObjectWithControllerTypes } from "../../gameobjects/controller/controller-geometries";

export class Controller
  extends GameObjectWithControllerTypes
  implements GameObjectOnGraph
{
  controllerCenter: Phaser.GameObjects.Sprite;
  rightHandle: Handle;
  leftHandle: Handle;
  line: Line;

  valid: boolean = true;

  depth: number = 5;
  imageOffsetY: number = -20;

	pointerdown(){}

  populateHandles() {
    this.rightHandle = new Handle(
      this.scene,
      this.pointRightTest,
      this.pointRightRender,
      this.onDrag("rightHandle", "leftHandle"),
      this.imageOffsetY,
			this.pointerdown.bind(this),
    );
    this.add(this.rightHandle, true);
    this.leftHandle = new Handle(
      this.scene,
      this.pointLeftTest,
      this.pointLeftRender,
      this.onDrag("leftHandle", "rightHandle"),
      this.imageOffsetY,
			this.pointerdown.bind(this),
    );
    this.add(this.leftHandle, true);
  }

  populate() {
    this.populateHandles();
    this.line = new Line(this.scene, this.leftHandle, this.rightHandle);
    this.add(this.line, true);
    this.controllerCenter = this.create(
      this.pointCenter.x,
      this.pointCenter.y + this.imageOffsetY,
      "controlPointCenter"
    );
    this.setDepth(this.depth);
    this.setVisible(false);
  }

  onDrag(
    handle: "rightHandle" | "leftHandle",
    otherHandle: "rightHandle" | "leftHandle"
  ): (x: number, y: number) => void {
    return function (x: number, y: number) {
      this[handle].move(x, y, this.valid);
      this[otherHandle].move(...this.pointCenter.reflectBy(x, y), this.valid);
      this.line.move(this[handle], this[otherHandle]);
    }.bind(this);
  }

  _setTint(color: number) {
    this.rightHandle.setTint(color);
    this.leftHandle.setTint(color);
    this.line.setTint(color);
  }

  onEvent(event: Events) {
    if (event == Events.CURVE_VALID) {
      this._setTint(Constants.PRIMARY_COLOR);
      this.valid = true;
    }
    if (event == Events.CURVE_INVALID) {
      this._setTint(Constants.ERROR_COLOR);
      this.valid = false;
    }
    if (event == Events.NODE_SELECTED) {
      this.setVisible(true);
    }
    if (event == Events.NODE_DESELECTED) {
      this.setVisible(false);
    }
  }
}
