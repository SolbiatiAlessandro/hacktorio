import { Node } from "../graph/node";
import {
  GameObjectOnGraph,
  GeometryOnGraph,
  GraphSelectConfig,
} from "../interfaces/graph.interface";
import { Graph, GraphObject, GraphSelection } from "../graph/graph";

export class Edge extends GraphObject {
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

  select(config: GraphSelectConfig = { eventForAll: -1 }) {
    GraphSelection.selectEdge(this, config);
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
