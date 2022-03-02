import * as graphology from "graphology";

import { Node } from "../graph/node";
import { Edge } from "../graph/edge";
import {
  GeometryOnGraph,
  GameObjectOnGraph,
} from "../interfaces/graph.interface";

import { Event, GraphEvent, Events } from "../events";

export class GraphObject {
  graph = Graph.getInstance();
  public gameObjects: Record<string, GameObjectOnGraph>;
  public geometries: Record<string, GeometryOnGraph>;

  broadcastToGameObjects(event: Event) {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.onEvent(event)
    );
  }
}

class GraphSelectionState{
	selectedEdge: Edge = null;

	get selectedNodes(): Array<Node>{
		return this.selectedEdge.neighbouringNodes();
	}

	emptySelection(){
		if( this.selectedEdge ) this.selectedEdge.deselect();
	}
}

// GraphSelectionObjects (Node | Edge) 
// 1) alert GraphSelection that they want to be selected
// 2) listen GraphEvents (emitted by GraphSelection) to react 
// when they have been successfully selected (thorugh receving a GraphEvent)
export class GraphSelection extends GraphSelectionState {

	static emitGraphEvent(to: Node | Edge, event: GraphEvent){
		to.on(event);
	}

	deselectEdge(edge: Edge){
		this.selectedEdge = null;

		GraphSelection.emitGraphEvent(edge, Events.EDGE_DESELECTED);

		edge.deselectNeighbourNodes();
	}

  selectEdge(edge: Edge) {
		if(this.selectedEdge) this.deselectEdge(this.selectedEdge)
		this.selectedEdge = edge;

		GraphSelection.emitGraphEvent(edge, Events.EDGE_SELECTED);

		edge.selectNeighbourNodes();
  }

	selectNode(node: Node){
		GraphSelection.emitGraphEvent(node, Events.NODE_SELECTED);
	}

	deselectNode(node: Node){
		GraphSelection.emitGraphEvent(node, Events.NODE_DESELECTED);
	}
}

// @ts-ignore
export class Graph extends graphology.Graph {
  private static instance: Graph;

  private readonly NODE: string = "_node";
  private readonly EDGE: string = "_edge";

	public graphSelection = new GraphSelection();

  public static getInstance(): Graph {
    if (!Graph.instance) {
      Graph.instance = new Graph();
    }
    return Graph.instance;
  }

  addNode(node: Node): string {
    let attr: any = {};
    attr[this.NODE] = node;
    super.addNode(node.name, attr);
    return node.name;
  }

  addEdge(edge: Edge): string {
    let attr: any = {};
    attr[this.EDGE] = edge;
    super.addEdgeWithKey(
      edge.name,
      edge.firstNode.name,
      edge.secondNode.name,
      attr
    );
    return edge.name;
  }

  allEdges() {
    return super.mapEdges((_: string, attr: any) => attr[this.EDGE]);
  }

  allNodes() {
    return super.mapNodes((_: string, attr: any) => attr[this.NODE]);
  }

  update() {
    // later we should update only selected from GraphEvents
    this.allEdges().map((edge: Edge) => edge.update());
  }
}
