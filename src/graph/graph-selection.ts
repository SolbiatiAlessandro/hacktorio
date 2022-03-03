import { Node } from "../graph/graphobjects/node";
import { Edge } from "../graph/graphobjects/edge";
import type { GraphSelectionObject } from "../graph/graphobjects/graph-selection-object";
import { Graph } from "../graph/graph";

import { Event, GraphEvent, Events } from "../events";

export class GraphSelectionState {
  selectedEdge: Edge = null;
  get selectedNodes(): Array<Node> {
    return GraphSelection.selectedEdgeFromState().neighbouringNodes();
  }
}

export class GraphSelection {
  static selectedEdgeFromState() {
    const graph: Graph = Graph.getInstance();
    return graph.graphSelectionState.selectedEdge;
  }

  static emptySelection() {
    if (GraphSelection.selectedEdgeFromState())
      GraphSelection.selectedEdgeFromState().deselect();
  }

  static emitGraphEvent(to: Node | Edge, event: GraphEvent) {
    to.on(event);
  }

  static deselect(graphSelectionObject: GraphSelectionObject) {
    if (graphSelectionObject instanceof Node)
      GraphSelection.deselectNode(graphSelectionObject);
    if (graphSelectionObject instanceof Edge)
      GraphSelection.deselectEdge(graphSelectionObject);
  }

  static select(graphSelectionObject: GraphSelectionObject) {
    if (graphSelectionObject instanceof Node)
      GraphSelection.selectNode(graphSelectionObject);
    if (graphSelectionObject instanceof Edge)
      GraphSelection.selectEdge(graphSelectionObject);
  }

  static deselectNode(node: Node) {
    GraphSelection.emitGraphEvent(node, Events.NODE_DESELECTED);
  }

  static deselectEdge(edge: Edge) {
    Graph.getInstance().graphSelectionState.selectedEdge = null;

    GraphSelection.emitGraphEvent(edge, Events.EDGE_DESELECTED);

    edge.deselectNeighbourNodes();
  }

  static selectEdge(edge: Edge) {
    const selectedEdge = GraphSelection.selectedEdgeFromState();
    if (selectedEdge) this.deselectEdge(selectedEdge);
    Graph.getInstance().graphSelectionState.selectedEdge = edge;

    GraphSelection.emitGraphEvent(edge, Events.EDGE_SELECTED);

    edge.selectNeighbourNodes();
  }

  static selectNode(node: Node) {
    GraphSelection.emitGraphEvent(node, Events.NODE_SELECTED);
  }
}
