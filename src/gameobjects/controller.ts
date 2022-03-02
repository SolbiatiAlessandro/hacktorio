import { Constants } from "../constants";
import { Events } from "../events";

import { MainScene } from "../scenes/main-scene";

import { Node } from "../graph/node";

import { Point } from "../geometry/point";

import { NodeGeometries } from "../builders/node-builder";

import { GameObjectOnGraph } from "../interfaces/graph.interface";

import { GameObject } from "../gameobjects/gameobject";

import { Handle } from "../gameobjects/controller/handle";
import { Line } from "../gameobjects/controller/line";

class GameObjectWithControllerGeometries
  extends GameObject
  implements GameObjectOnGraph
{
  get pointCenter(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[NodeGeometries.POINT__CENTER];
  }

  get pointLeftTest(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__LEFT_HANDLE_TEST
    ];
  }

  get pointLeftRender(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__LEFT_HANDLE
    ];
  }

  get pointRightTest(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__RIGHT_HANDLE_TEST
    ];
  }

  get pointRightRender(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__RIGHT_HANDLE
    ];
  }

  update() {}
}

export class Controller
  extends GameObjectWithControllerGeometries
  implements GameObjectOnGraph
{
  controllerCenter: Phaser.GameObjects.Sprite;
  rightHandle: Handle;
  leftHandle: Handle;
  line: Line;

  valid: boolean = true;

  depth: number = 3;

  populateHandles() {
    this.rightHandle = new Handle(
      this.scene,
      this.pointRightTest,
      this.pointRightRender,
      this.onDrag("rightHandle", "leftHandle")
    );
    this.add(this.rightHandle, true);
    this.leftHandle = new Handle(
      this.scene,
      this.pointLeftTest,
      this.pointLeftRender,
      this.onDrag("leftHandle", "rightHandle")
    );
    this.add(this.leftHandle, true);
  }

  populate() {
    this.populateHandles();
    this.line = new Line(this.scene, this.leftHandle, this.rightHandle);
    this.add(this.line, true);
    this.controllerCenter = this.create(
      ...this.pointCenter.vector(),
      "controlPointCenter"
    );
    this.setDepth(this.depth);
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

  onEvent(event: number) {
    if (event == Events.CURVE_VALID) {
      this._setTint(Constants.PRIMARY_COLOR);
      this.valid = true;
    }
    if (event == Events.CURVE_INVALID) {
      this._setTint(Constants.ERROR_COLOR);
      this.valid = false;
    }
  }
}
