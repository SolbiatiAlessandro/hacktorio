import { MainScene } from "../scenes/main-scene";

import { Node } from "../graph/node";

import { Point } from "../geometry/point";

import { NodeGeometries } from "../builders/node-builder";

import { GameObjectOnGraph } from "../interfaces/graph.interface";

class ControllerCenter extends Phaser.GameObjects.Image {
	constructor(scene: MainScene){
		super(scene, 0, 0, "controlPointCenter");
	}
}

class ControllerHandle extends Phaser.GameObjects.Image {
	constructor(scene: MainScene){
		super(scene, 0, 0, "controlPoint");
	}
}

export class Controller   
extends Phaser.GameObjects.Group
implements GameObjectOnGraph
{
  _graphParentElement: Node;

	controllerCenter: ControllerCenter;
	rightHandle: ControllerHandle;
	leftHandle: ControllerHandle;

	constructor(scene: MainScene){
		super(scene);
		this.controllerCenter = new ControllerCenter(scene);
		this.add(this.controllerCenter);
		this.rightHandle = new ControllerHandle(scene);
		this.add(this.rightHandle);
		this.leftHandle = new ControllerHandle(scene);
		this.add(this.leftHandle);
	}

  get graphParentElement(): Node {
    return this._graphParentElement;
  }

  set graphParentElement(edge: Node) {
    this._graphParentElement = edge;
		this.setupImages();
  }

	setupImages(){
		this._setupImage(
		  //@ts-ignore
			this.graphParentElement.geometries[NodeGeometries.POINT__CENTER],
			this.controllerCenter
		);
		this._setupImage(
		  //@ts-ignore
			this.graphParentElement.geometries[NodeGeometries.POINT__RIGHT_HANDLE],
			this.rightHandle
		);
		this._setupImage(
		  //@ts-ignore
			this.graphParentElement.geometries[NodeGeometries.POINT__LEFT_HANDLE],
			this.leftHandle
		);
	}

	_setupImage(point: Point, image: ControllerCenter | ControllerHandle){
		image.x = point.x;
		image.y = point.y;
	}

	update(){};
}


