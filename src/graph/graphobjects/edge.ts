import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../../interfaces/graph.interface";

import { Graph } from "../../graph/graph";
import { GraphSelection } from "../../graph/graph-selection";

import { GraphObject } from "../../graph/graphobjects/graph-object";
import { Node } from "../../graph/graphobjects/node";
import { GraphSelectableObject } from "../../graph/graphobjects/graph-selectable-object";

import { GraphEvent, Event, Events } from "../../events";

export class Edge extends GraphSelectableObject {
  public name: string;
  readonly SELECTION_EVENTS: Array<Event> = [
    Events.EDGE_DESELECTED,
    Events.EDGE_SELECTED,
  ];
  graph: Graph = Graph.getInstance();

  constructor(
    public firstNode: Node,
    public secondNode: Node,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    super();
    this.name = firstNode.name + "-" + secondNode.name;
  }

  neighbouringNodes(): [Node, Node] {
    return [this.firstNode, this.secondNode];
  }

  selectNeighbourNodes() {
    this.neighbouringNodes().map((node: Node) => node.select());
  }

  deselectNeighbourNodes() {
    this.neighbouringNodes().map((node: Node) => node.deselect());
  }

  broadcastToNeighbourNodes(event: Event) {
    this.neighbouringNodes().map((node: Node) =>
      node.broadcastToGameObjects(event)
    );
  }

}
