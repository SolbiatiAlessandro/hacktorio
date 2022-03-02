import { Node } from "../graph/node";
import { Edge } from "../graph/edge";

export interface GraphSelectConfig {
	eventForAll: number; // broadcast to all edges, e.g. eventForAll = deselect
}

export interface GameObjectOnGraph {
  graphParentElement: Node | Edge;
  update: () => void;
  onEvent: (event: number) => void;
}

export interface GeometryOnGraph {
  graphParentElement: Node | Edge;
  update: () => void;
}
