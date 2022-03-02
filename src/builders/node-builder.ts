import { Node } from "../graph/graphobjects/node";
import { Graph } from "../graph/graph";

import {
  GeometryOnGraph,
  GameObjectOnGraph,
} from "../interfaces/graph.interface";

import { Point } from "../geometry/point";

import { GeometryBuilder } from "../builders/geometry-builder";

import { MainScene } from "../scenes/main-scene";

import { Controller } from "../gameobjects/controller/controller";

export enum NodeGeometries {
  POINT__CENTER,
  POINT__LEFT_HANDLE,
  POINT__RIGHT_HANDLE,
  POINT__LEFT_HANDLE_TEST,
  POINT__RIGHT_HANDLE_TEST,
}

export enum NodeGameObjects {
  CONTROLLER,
}

export class NodeBuilder {
  graph: Graph = Graph.getInstance();
  geometryBuilder: GeometryBuilder = new GeometryBuilder();

  private readonly HANDLE_OFFSET = 60;

  constructor(public scene: MainScene) {}

  buildGeometries(x: number, y: number): Record<string, GeometryOnGraph> {
    const geometries: Record<string, GeometryOnGraph> = {};
    geometries[NodeGeometries.POINT__CENTER] = new Point(x, y);
    geometries[NodeGeometries.POINT__LEFT_HANDLE] = new Point(
      x - this.HANDLE_OFFSET,
      y - this.HANDLE_OFFSET
    );
    geometries[NodeGeometries.POINT__RIGHT_HANDLE] = new Point(
      x + this.HANDLE_OFFSET,
      y + this.HANDLE_OFFSET
    );
    geometries[NodeGeometries.POINT__LEFT_HANDLE_TEST] = new Point(
      x - this.HANDLE_OFFSET,
      y - this.HANDLE_OFFSET
    );
    geometries[NodeGeometries.POINT__RIGHT_HANDLE_TEST] = new Point(
      x + this.HANDLE_OFFSET,
      y + this.HANDLE_OFFSET
    );
    return geometries;
  }

  buildGameObjects(): Record<string, GameObjectOnGraph> {
    const gameObjects: Record<string, GameObjectOnGraph> = {};
    gameObjects[NodeGameObjects.CONTROLLER] = new Controller(this.scene);
    return gameObjects;
  }

  build(x: number, y: number): Node {
    // @ts-ignore
    const name: string = this.graph.order;
    const geometries = this.buildGeometries(x, y);
    const gameObjects = this.buildGameObjects();

    const node = new Node(name, gameObjects, geometries);
    this.graph.addNode(node);
    Object.entries(geometries).forEach(
      ([key, geometry]) => (geometry.graphParentElement = node)
    );
    Object.entries(gameObjects).forEach(
      ([key, gameObject]) => (gameObject.graphParentElement = node)
    );
    return node;
  }
}
