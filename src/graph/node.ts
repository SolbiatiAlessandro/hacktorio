import {
  GameObjectOnGraph,
  GeometryOnGraph,
	GraphParentElement
} from "../interfaces/graph.interface";
import {
	GraphObject
} from "../graph/graph";

export class Node extends GraphObject implements GraphParentElement {
  constructor(
    public name: string,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
	super();
	}

  broadcastToGameObjects(event: number) {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.onEvent(event)
    );
  }

	broadcastToNeighbourNodes(event: number){
		throw "NotImplemented";
	}
}
