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
export class Graph extends graphology.Graph {
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
