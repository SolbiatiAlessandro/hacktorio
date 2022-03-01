import {Node} from "../../graph/node"
import {Graph} from "../../graph/graph"

import {GeometryOnGraph, GameObjectOnGraph} from "../../interfaces/graph.interface"

import {Point} from "../../geometry/point"

import {GeometryBuilder} from "../../builders/geometry-builder"

export enum NodeGeometries {
	POINT__CENTER,
	POINT__LEFT_HANDLE,
	POINT__RIGHT_HANDLE
}

export class NodeBuilder{
	graph: Graph = Graph.getInstance();
	geometryBuilder: GeometryBuilder = new GeometryBuilder();

	build(name: string, x: number, y: number): Node{
		const gameObjects: Record<string, GameObjectOnGraph> = {};
		const geometries: Record<string, GeometryOnGraph> = {};
		geometries[NodeGeometries.POINT__CENTER] = new Point(x, y);
		geometries[NodeGeometries.POINT__LEFT_HANDLE] = new Point(x, y);
		geometries[NodeGeometries.POINT__RIGHT_HANDLE] = new Point(x, y);
		const node = new Node(name, gameObjects, geometries)
		this.graph.addNode(node);
		Object.entries(geometries).forEach(([key, geometry]) => geometry.graphParentElement = node);
		Object.entries(gameObjects).forEach(([key, gameObject]) => gameObject.graphParentElement = node);
		return node;
	}
}
