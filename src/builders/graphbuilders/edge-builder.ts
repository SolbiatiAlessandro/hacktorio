import {Edge} from "../../graph/edge"
import {Node} from "../../graph/node"
import {Graph} from "../../graph/graph"

import {GeometryOnGraph, GameObjectOnGraph} from "../../interfaces/graph.interface"

import {Point} from "../../geometry/point"
import {CurveTypes, CurveForTest, CurveForRender} from "../../geometry/curve"

import {GeometryBuilder} from "../../builders/geometry-builder"
import {NodeBuilder} from "../../builders/graphbuilders/node-builder"

export class EdgeBuilder{
	graph: Graph = Graph.getInstance();
	geometryBuilder: GeometryBuilder = new GeometryBuilder();

	build(firstNode: Node, secondNode: Node){

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
