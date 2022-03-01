import { Edge } from "../graph/edge";
import { Node } from "../graph/node";
import { Graph } from "../graph/graph";

import {
  GeometryOnGraph,
  GameObjectOnGraph,
} from "../interfaces/graph.interface";

import { Point } from "../geometry/point";
import { CurveTypes, CurveForTest, CurveForRender } from "../geometry/curve";

import { GeometryBuilder } from "../builders/geometry-builder";
import { NodeBuilder } from "../builders/node-builder";

import { TopRailway, BottomRailway } from "../gameobjects/railway";

import { MainScene } from "../scenes/main-scene";

export enum GeometryEdge {
  CURVE__RENDER,
  CURVE__TEST,
}

export enum GameObjectEdge {
  RAILWAY__TOP,
  RAILWAY__BOTTOM,
}

export class EdgeBuilder {
  graph: Graph = Graph.getInstance();
  geometryBuilder: GeometryBuilder = new GeometryBuilder();
  constructor(public scene: MainScene) {}

  buildGeometries(
    firstNode: Node,
    secondNode: Node
  ): Record<string, GeometryOnGraph> {
    const geometries: Record<string, GeometryOnGraph> = {};
    geometries[GeometryEdge.CURVE__RENDER] = this.geometryBuilder.newCurve(
      CurveTypes.FOR_RENDER,
      firstNode,
      secondNode
    );
    geometries[GeometryEdge.CURVE__TEST] = this.geometryBuilder.newCurve(
      CurveTypes.FOR_TEST,
      firstNode,
      secondNode
    );
    return geometries;
  }

  buildGameObjects(
    firstNode: Node,
    secondNode: Node
  ): Record<string, GameObjectOnGraph> {
    const gameObjects: Record<string, GameObjectOnGraph> = {};
    gameObjects[GameObjectEdge.RAILWAY__TOP] = new TopRailway(this.scene);
    gameObjects[GameObjectEdge.RAILWAY__BOTTOM] = new BottomRailway(this.scene);
    return gameObjects;
  }

  build(firstNode: Node, secondNode: Node) {
    const gameObjects = this.buildGameObjects(firstNode, secondNode);
    const geometries = this.buildGeometries(firstNode, secondNode);
    const edge = new Edge(firstNode, secondNode, gameObjects, geometries);
    this.graph.addEdge(edge);
    Object.entries(geometries).forEach(
      ([key, geometry]) => (geometry.graphParentElement = edge)
    );
    Object.entries(gameObjects).forEach(
      ([key, gameObject]) => (gameObject.graphParentElement = edge)
    );
    return edge;
  }
}
