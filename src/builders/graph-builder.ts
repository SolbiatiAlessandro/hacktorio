import {Edge} from "../graph/edge"
import {Node} from "../graph/node"
import {Graph} from "../graph/graph"

import {GeometryOnGraph, GameObjectOnGraph} from "../interfaces/graph.interface"

import {Point} from "../geometry/point"
import {CurveTypes, CurveForTest, CurveForRender} from "../geometry/curve"

import {GeometryBuilder} from "../builders/geometry-builder"
import {NodeBuilder} from "../builders/graphbuilders/node-builder"
import {EdgeBuilder} from "../builders/graphbuilders/edge-builder"

export class GraphBuilder{
	nodeBuilder: NodeBuilder = new NodeBuilder();
	edgeBuilder: EdgeBuilder = new EdgeBuilder();

	newNode(name: string, x: number, y: number){
		return this.nodeBuilder.build(name, x, y);
	}

	newEdge(firstNode: Node, secondNode: Node){
		return this.edgeBuilder.build(firstNode, secondNode);
	}
}
