import { Constants } from "../constants";

import { MainScene } from "../scenes/main-scene";

import { Node } from "../graph/node";

import { Point } from "../geometry/point";

import { NodeGeometries } from "../builders/node-builder";

import { GameObjectOnGraph } from "../interfaces/graph.interface";

import { GameObject } from "../gameobjects/gameobject";

import { Handle } from "../gameobjects/controller/handle";
import { Line } from "../gameobjects/controller/line";

export class Controller extends GameObject implements GameObjectOnGraph {
  controllerCenter: Phaser.GameObjects.Sprite;
  rightHandle: Handle;
  leftHandle: Handle;
  line: Line;

  depth: number = 3;

  pointCenter(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[NodeGeometries.POINT__CENTER];
  }

  pointLeft(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__LEFT_HANDLE
    ];
  }

  pointRight(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__RIGHT_HANDLE
    ];
  }

  populateHandles() {
    this.rightHandle = new Handle(
      this.scene,
      this.pointRight(),
      this.onDrag("rightHandle")
    );
    this.add(this.rightHandle, true);
    this.leftHandle = new Handle(
      this.scene,
      this.pointLeft(),
      this.onDrag("leftHandle")
    );
    this.add(this.leftHandle, true);
  }

  populate() {
    this.populateHandles();
    this.line = new Line(this.scene, this.leftHandle, this.rightHandle);
    this.add(this.line, true);
    this.controllerCenter = this.create(
      ...this.pointCenter().vector(),
      "controlPointCenter"
    );
    this.setDepth(this.depth);
  }

  onDrag(who: "rightHandle" | "leftHandle"): (x: number, y: number) => void {
    return function (x: number, y: number) {
      const handle = who == "rightHandle" ? this.rightHandle : this.leftHandle;
      const otherHandle =
        who == "rightHandle" ? this.leftHandle : this.rightHandle;
      handle.setPosition(x, y);
      otherHandle.setPosition(...this.pointCenter().reflectBy(x, y));
      this.line.setTo(handle.x, handle.y, otherHandle.x, otherHandle.y);
    }.bind(this);
  }

  update() {}
}
