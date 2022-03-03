import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../../interfaces/graph.interface";

import { Graph } from "../../graph/graph";
import { GraphSelection } from "../../graph/graph-selection";

import { GraphObject } from "../../graph/graphobjects/graph-object";
import { GraphSelectionObject } from "../../graph/graphobjects/graph-selection-object";

import { Event, GraphEvent, Events } from "../../events";

export class Node extends GraphSelectionObject {
  graph: Graph = Graph.getInstance();
  readonly SELECTION_EVENTS: Array<Event> = [
    Events.NODE_SELECTED,
    Events.NODE_DESELECTED,
  ];

  constructor(
    public name: string,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    super();
  }
}
