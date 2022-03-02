import { Node } from "../graph/node";
import { Edge } from "../graph/edge";

export interface GameObjectOnGraph {
  graphParentElement: Node | Edge;
  update: () => void;
  onEvent: (event: number) => void;
}

export interface GeometryOnGraph {
  graphParentElement: Node | Edge;
  update: () => void;
}
