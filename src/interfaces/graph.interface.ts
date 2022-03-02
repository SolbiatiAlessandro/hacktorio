import { Node } from "../graph/graphobjects/node";
import { Edge } from "../graph/graphobjects/edge";
import { Event }  from "../events";

export interface GameObjectOnGraph {
  graphParentElement: Node | Edge;
  update: () => void;
  onEvent: (event: Event) => void;
}

export interface GeometryOnGraph {
  graphParentElement: Node | Edge;
  update: () => void;
}
