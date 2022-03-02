import { Node } from "../graph/node";
import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../interfaces/graph.interface";

export class Edge {
  public name: string;
  constructor(
    public firstNode: Node,
    public secondNode: Node,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    this.name = firstNode.name + "-" + secondNode.name;
  }

	broadcastToNeighbourNodes(event: number){
		this.firstNode.broadcast(event);
		this.secondNode.broadcast(event);
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
