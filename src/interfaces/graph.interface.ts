import { Node } from "../graph/node";
import { Edge } from "../graph/edge";

export interface GraphParentElement {
  broadcastToAllEdges: (event: number) => void;
  broadcastToAllNodes: (event: number) => void;
  broadcastToNeighbourNodes: (event: number) => void;
  broadcastToGameObjects: (event: number) => void;
}

export interface GameObjectOnGraph {
  graphParentElement: GraphParentElement;
  update: () => void;
  onEvent: (event: number) => void;
}

export interface GeometryOnGraph {
  graphParentElement: GraphParentElement;
  update: () => void;
}
