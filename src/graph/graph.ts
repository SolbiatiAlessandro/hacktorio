import * as graphology from "graphology";

import { Node } from "../graph/graphobjects/node";
import { Edge } from "../graph/graphobjects/edge";
import { GraphObject } from "../graph/graphobjects/graph-object";

import { GraphSelection, GraphSelectionState } from "../graph/graph-selection";
import {
  GeometryOnGraph,
  GameObjectOnGraph,
} from "../interfaces/graph.interface";

import { Event, GraphEvent, Events } from "../events";


// @ts-ignore
export class Graph extends graphology.UndirectedGraph {
  private static instance: Graph;

  private readonly NODE: string = "_node";
  private readonly EDGE: string = "_edge";

	public graphSelectionState = new GraphSelectionState();

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

  get allEdges() {
    return super.mapEdges((_: string, attr: any) => attr[this.EDGE]);
  }

  get allNodes() {
    return super.mapNodes((_: string, attr: any) => attr[this.NODE]);
  }

	nodeNeighbors(node: Node): Array<Node>{
		return super.mapNeighbors(node.name, (name: string, attr: any) => attr[this.NODE]);
	}

	edgeFromNodes(firstNode: Node, secondNode: Node): Edge{
		return super.getEdgeAttribute(firstNode.name, secondNode.name, this.EDGE);
	}

	updateEdges(edges: Array<Edge>){
		edges.map((edge: Edge) => edge.update());
	}

	updateEverything(){
		this.updateEdges(this.allEdges);
	}

  update() {
		if(this.graphSelectionState.selectionChanged){
			this.updateEverything();
			this.graphSelectionState.selectionChanged = false;
		} else {
			this.updateEdges(this.graphSelectionState.activeEdges);
		}
  }
}
