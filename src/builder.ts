import {Node} from "./graph/node"
import {Graph} from "./graph/graph"

import {GeometryOnGraph, GameObjectOnGraph} from "./interfaces/graph.interface"

import {Point} from "./geometry/point"

export class Builder{
	graph: Graph = Graph.getInstance()

	newNode(name: string, x: number, y: number){
		let gameObjects: Array<GameObjectOnGraph> = [];
		let geometries: Array<GeometryOnGraph> = [new Point(x, y)];
		let node = new Node(name, gameObjects, geometries)
		this.graph.addNode(node);
		geometries.forEach(geometry => geometry.graphParentElement = node);
		gameObjects.forEach(gameObject => gameObject.graphParentElement = node);
	}
}
