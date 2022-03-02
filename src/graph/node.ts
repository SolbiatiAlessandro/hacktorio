import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../interfaces/graph.interface";
import { GraphObject } from "../graph/graph";

export class Node extends GraphObject{
  constructor(
    public name: string,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    super();
  }
}
