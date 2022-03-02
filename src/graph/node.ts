import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../interfaces/graph.interface";

export class Node {
  constructor(
    public name: string,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {}

  broadcast(event: number) {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.onEvent(event)
    );
  }
}
