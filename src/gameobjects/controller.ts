import { Constants } from "../constants"; 

import { MainScene } from "../scenes/main-scene";

import { Node } from "../graph/node";

import { Point } from "../geometry/point";

import { NodeGeometries } from "../builders/node-builder";

import { GameObjectOnGraph } from "../interfaces/graph.interface";


export class Controller   
extends Phaser.GameObjects.Group
implements GameObjectOnGraph
{
  _graphParentElement: Node;

	controllerCenter: Phaser.GameObjects.Sprite;
	rightHandle: Phaser.GameObjects.Sprite;
	leftHandle: Phaser.GameObjects.Sprite;
	line: Phaser.GameObjects.Line;

	depth: number = 3;

	pointCenter(): Point{
		//@ts-ignore
		return this.graphParentElement.geometries[NodeGeometries.POINT__CENTER];
	}

	pointLeft(): Point{
		//@ts-ignore
		return this.graphParentElement.geometries[NodeGeometries.POINT__LEFT_HANDLE];
	}

	pointRight(): Point{
		//@ts-ignore
		return this.graphParentElement.geometries[NodeGeometries.POINT__RIGHT_HANDLE];
	}

  get graphParentElement(): Node {
    return this._graphParentElement;
  }

  set graphParentElement(edge: Node) {
    this._graphParentElement = edge;
		this.populate();
  }

	populate(){
		this.controllerCenter = this.create(
			...this.pointCenter().vector(),
			"controlPointCenter"
		);
		this.rightHandle = this.create(
			...this.pointRight().vector(),
			"controlPoint"
		);
		this.leftHandle = this.create(
			...this.pointLeft().vector(),
			"controlPoint"
		);
		this.line = new Phaser.GameObjects.Line(
      this.scene,
      0, 0,
      this.leftHandle.x, this.leftHandle.y,
      this.rightHandle.x, this.rightHandle.y,
			Constants.PRIMARY_COLOR, 0.5
    );
		this.line.setOrigin(0, 0);
		this.add(this.line);
		this.setDepth(this.depth);
	}

	update(){};
}


