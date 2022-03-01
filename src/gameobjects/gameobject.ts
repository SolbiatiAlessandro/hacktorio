import { Edge } from "../graph/edge";
import { Node } from "../graph/node";

export class GameObject extends Phaser.GameObjects.Group {
  _graphParentElement: Edge | Node;

  get graphParentElement(): Edge | Node {
    return this._graphParentElement;
  }

  set graphParentElement(elem: Edge | Node) {
    this._graphParentElement = elem;
    this.populate();
  }

  // this.graphParentElement has been set
  populate() {}
}
