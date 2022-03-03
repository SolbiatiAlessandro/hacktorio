import { Edge } from "../graph/graphobjects/edge";
import { Node } from "../graph/graphobjects/node";
import { Graph } from "../graph/graph";
import { GeometriesOnGraphObject } from "../graph/graphobjects/graph-object";

import {
  GeometryOnGraph,
  GameObjectOnGraph,
} from "../interfaces/graph.interface";

import { Point } from "../geometry/point";
import { CurveTypes, CurveForTest, CurveForRender } from "../geometry/curve";

import { GeometryBuilder } from "../builders/geometry-builder";
import { NodeBuilder } from "../builders/node-builder";

import {
  TopRailway,
  BottomRailway,
  ShadowRailway,
} from "../gameobjects/railway/railway";

import { GeometriesForRailway } from "../gameobjects/railway/interfaces/geometries-for-railway.interface"

import { MainScene } from "../scenes/main-scene";

export enum EdgeGeometries {
  CURVE__RENDER,
  CURVE__TEST,
}

export enum EdgeGameObjects {
  RAILWAY__TOP,
  RAILWAY__BOTTOM,
  RAILWAY__SHADOW,
}

class GeometriesOnEdge 
extends GeometriesOnGraphObject 
implements GeometriesForRailway{
	renderCurve: CurveForRender;
	constructor(geometryBuilder: GeometryBuilder, firstNode: Node, secondNode: Node){
		super();
		//@ts-ignore
    const renderCurve: CurveForRender = geometryBuilder.newCurve(
      CurveTypes.FOR_RENDER,
      firstNode,
      secondNode
    );
		this.renderCurve = renderCurve;
		this.geometries.push(renderCurve);

    const testCurve = geometryBuilder.newCurve(
      CurveTypes.FOR_TEST,
      firstNode,
      secondNode
    );
		this.geometries.push(testCurve);
	}
}

export class EdgeBuilder {
  graph: Graph = Graph.getInstance();
  geometryBuilder: GeometryBuilder = new GeometryBuilder();
  constructor(public scene: MainScene) {}

  buildGameObjects(): Record<string, GameObjectOnGraph> {
    const gameObjects: Record<string, GameObjectOnGraph> = {};
    gameObjects[EdgeGameObjects.RAILWAY__TOP] = new TopRailway(this.scene);
    gameObjects[EdgeGameObjects.RAILWAY__BOTTOM] = new BottomRailway(
      this.scene
    );
    gameObjects[EdgeGameObjects.RAILWAY__SHADOW] = new ShadowRailway(
      this.scene
    );
    return gameObjects;
  }

  build(firstNode: Node, secondNode: Node) {
    const gameObjects = this.buildGameObjects();
    const geometries = new GeometriesOnEdge(this.geometryBuilder, firstNode, secondNode);
    const edge = new Edge(firstNode, secondNode, gameObjects, geometries);
    this.graph.addEdge(edge);
		geometries.parentGraphObject = edge;
    Object.entries(gameObjects).forEach(
      ([key, gameObject]) => (gameObject.graphParentElement = edge)
    );
    return edge;
  }
}
