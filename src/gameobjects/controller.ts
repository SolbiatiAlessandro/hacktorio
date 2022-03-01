import { Constants } from "../constants";

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

  get pointLeft(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__LEFT_HANDLE
    ];
  }

  get pointRight(): Point {
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

  depth: number = 3;

  populateHandles() {
    this.rightHandle = new Handle(
      this.scene,
      this.pointRight,
      this.onDrag("rightHandle", "leftHandle")
    );
    this.add(this.rightHandle, true);
    this.leftHandle = new Handle(
      this.scene,
      this.pointLeft,
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
      this[handle].setPosition(x, y);
      this[handle].point.setPosition(x, y);
      this[otherHandle].setPosition(...this.pointCenter.reflectBy(x, y));
      this[otherHandle].point.setPosition(...this.pointCenter.reflectBy(x, y));
      this.line.setTo(
        this[handle].x,
        this[handle].y,
        this[otherHandle].x,
        this[otherHandle].y
      );
    }.bind(this);
  }

  update() {}
}
