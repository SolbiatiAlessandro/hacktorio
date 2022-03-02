import * as graphology from "graphology";

import { Node } from "../graph/node";
import { Edge } from "../graph/edge";
import {
  GeometryOnGraph,
  GameObjectOnGraph,
	GraphSelectConfig
} from "../interfaces/graph.interface";

export class GraphObject {
  graph = Graph.getInstance();
  public gameObjects: Record<string, GameObjectOnGraph>;
  public geometries: Record<string, GeometryOnGraph>;

  broadcastToGameObjects(event: number) {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.onEvent(event)
    );
  }
}

// @ts-ignore
export class Graph extends graphology.Graph {
  private static instance: Graph;

  private readonly NODE: string = "_node";
  private readonly EDGE: string = "_edge";


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

  broadcastToAllEdges(event: number) {
    this.allEdges().map((edge: Edge) => edge.broadcast(event));
  }

	private selectedEdge: Edge = null;

	public selectEdge(edge: Edge, config: GraphSelectConfig){
		this.selectedEdge = edge;
		this.broadcastToAllEdges(config.eventForAll);
	}

  update() {
    // later we should update only selected from GraphEvents
    this.allEdges().map((edge: Edge) => edge.update());
  }
}
