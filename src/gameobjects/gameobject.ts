import { Edge } from "../graph/graphobjects/edge";
import { Node } from "../graph/graphobjects/node";
import { Event } from "../events";

export class GameObject extends Phaser.GameObjects.Group {
  _graphParentElement: Edge | Node;

  get graphParentElement(): Edge | Node {
    return this._graphParentElement;
  }

  set graphParentElement(elem: Edge | Node) {
    this._graphParentElement = elem;
    this.populate();
  }

  // here this.graphParentElement has been set
  populate() {}

  onEvent(event: Event) {}

  update() {}
}
