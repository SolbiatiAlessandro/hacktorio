import { Constants } from "../constants";

import { MainScene } from "../scenes/main-scene";

import { Node } from "../graph/node";

import { Point } from "../geometry/point";

import { NodeGeometries } from "../builders/node-builder";

import { GameObjectOnGraph } from "../interfaces/graph.interface";

import { GameObject } from "../gameobjects/gameobject";

import { Handle } from "../gameobjects/controller/handle";
import { Line } from "../gameobjects/controller/line";

export class Controller
  extends GameObject
  implements GameObjectOnGraph
{
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

  populate() {
    this.rightHandle = new Handle(this.scene, this.pointRight());
    this.add(this.rightHandle, true);
    this.leftHandle = new Handle(this.scene, this.pointLeft());
    this.add(this.leftHandle, true);
    this.line = new Line(this.scene, this.leftHandle, this.rightHandle);
    this.add(this.line, true);
    this.controllerCenter = this.create(
      ...this.pointCenter().vector(),
      "controlPointCenter"
    );
    this.setDepth(this.depth);
  }

  update() {}
}
