import { Node } from "../graph/node";
import {
  GameObjectOnGraph,
  GeometryOnGraph,
  GraphParentElement,
} from "../interfaces/graph.interface";
import { GraphObject } from "../graph/graph";

export class Edge extends GraphObject implements GraphParentElement {
  public name: string;
  constructor(
    public firstNode: Node,
    public secondNode: Node,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    super();
    this.name = firstNode.name + "-" + secondNode.name;
  }

  broadcastToNeighbourNodes(event: number) {
    this.firstNode.broadcastToGameObjects(event);
    this.secondNode.broadcastToGameObjects(event);
  }

  update() {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.update()
    );
    Object.entries(this.geometries).forEach(([_, geometry]) =>
      geometry.update()
    );
  }
}
