import {Edge} from "../graph/edge"
import {Node} from "../graph/node"
import {Graph} from "../graph/graph"

import {GeometryOnGraph, GameObjectOnGraph} from "../interfaces/graph.interface"

import {Point} from "../geometry/point"
import {CurveTypes, CurveForTest, CurveForRender} from "../geometry/curve"

import {GeometryBuilder} from "../builders/geometry-builder"

export class GraphBuilder{
	graph: Graph = Graph.getInstance();
	geometryBuilder: GeometryBuilder = new GeometryBuilder();

	newNode(name: string, x: number, y: number){
		const gameObjects: Record<string, GameObjectOnGraph> = {};
		const geometries: Record<string, GeometryOnGraph> = {
			'POINT_CENTER': new Point(x, y),
			'POINT_LEFT_HANDLE': new Point(x, y),
			'POINT_RIGHT_HANDLE': new Point(x, y)
		}
		const node = new Node(name, gameObjects, geometries)
		this.graph.addNode(node);
		Object.entries(geometries).forEach(([key, geometry]) => geometry.graphParentElement = node);
		Object.entries(gameObjects).forEach(([key, gameObject]) => gameObject.graphParentElement = node);
		return node;
	}

	newEdge(firstNode: Node, secondNode: Node){
		const gameObjects: Record<string, GameObjectOnGraph> = {};
		const geometries: Record<string, GeometryOnGraph> = {
			'RENDER_CURVE': this.geometryBuilder.newCurve(
				CurveTypes.FOR_RENDER, 
				firstNode,
				secondNode
			),
			'TEST_CURVE': this.geometryBuilder.newCurve(
				CurveTypes.FOR_TEST, 
				firstNode,
				secondNode
			),
		}
		const edge = new Edge(firstNode, secondNode, gameObjects, geometries);
		this.graph.addEdge(edge);
		Object.entries(geometries).forEach(([key, geometry]) => geometry.graphParentElement = edge);
		Object.entries(gameObjects).forEach(([key, gameObject]) => gameObject.graphParentElement = edge);
		return edge;
	}
}
