import { Graph } from "../../graph/graph";
import {
  GeometryOnGraph,
  GameObjectOnGraph,
} from "../../interfaces/graph.interface";
import { Event, GraphEvent, Events } from "../../events";

export abstract class GraphObject {
  graph = Graph.getInstance();
  public gameObjects: Record<string, GameObjectOnGraph>;
  public geometries: Record<string, GeometryOnGraph>;

  broadcastToGameObjects(event: Event) {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.onEvent(event)
    );
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
